import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import {
  CollectionItem,
  CollectionTableItem,
  MissingIds,
} from '@bgs/shared';
import { BggApiClient } from '../bgg/bgg-api.client';
import { SupabaseService } from '../supabase/supabase.service';

interface BggCollectionItem {
  objectid: string;
  name: { '#text': string };
  image?: string;
  thumbnail?: string;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

@Injectable()
export class CollectionsService {
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly bggClient: BggApiClient,
  ) {}

  async getUserCollections(userId: string): Promise<CollectionTableItem[]> {
    const adminClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient.rpc('get_user_collection', {
      user_id: userId,
    });
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getCollectionPreview(userId: string, limit = 12): Promise<CollectionItem[]> {
    const adminClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient.rpc('get_game_preview', {
      user_id: userId,
      limit_count: limit,
    });
    if (error) throw new Error(error.message);

    return (data ?? []).map((item: CollectionTableItem) => ({
      bggGameId: item.bgg_game_id,
      gameId: item.game_id,
      name: item.name,
      imageUrl: item.image_url,
      thumbnailUrl: item.thumbnail_url,
    }));
  }

  async importBggCollection(bggUsername: string, userId: string) {
    const adminClient = this.supabase.getAdminClient();
    const xml = await this.bggClient.fetchCollectionXml(bggUsername);
    const parsed = this.parser.parse(xml);
    const rawItems = parsed?.items?.item;
    if (!rawItems) {
      return { imported: 0, message: 'No collection items found' };
    }

    const items: BggCollectionItem[] = Array.isArray(rawItems) ? rawItems : [rawItems];
    const now = new Date().toISOString();
    const existing = await this.getUserCollections(userId);
    const existingBggIds = new Set(existing.map((g) => g.bgg_game_id));

    const { data: collectionData, error: insertError } = await adminClient
      .from('collections')
      .upsert(
        { user_id: userId, last_synced_at: now, source: 'bgg' },
        { onConflict: 'user_id' },
      )
      .select('id')
      .single();

    if (insertError) throw new Error(insertError.message);
    const collectionId = collectionData.id as string;

    const newBggIds = items
      .map((item) => Number(item.objectid))
      .filter((id) => !existingBggIds.has(id));

    const missingIds: number[] = [];
    for (const chunk of chunkArray(newBggIds, 1000)) {
      const { data, error } = await adminClient.rpc('get_missing_game_ids', {
        _ids: chunk,
      });
      if (error) throw new Error(error.message);
      missingIds.push(...(data ?? []).map((row: MissingIds) => row.missing_id));
    }

    for (const bggId of missingIds) {
      const item = items.find((i) => Number(i.objectid) === bggId);
      if (!item) continue;
      await adminClient.from('games').insert({
        bgg_game_id: bggId,
        name: item.name?.['#text'] ?? `Game ${bggId}`,
        image_url: item.image ?? '',
        thumbnail_url: item.thumbnail ?? '',
      });
    }

    const toLink = items.filter((item) => !existingBggIds.has(Number(item.objectid)));
    for (const item of toLink) {
      const { data: gameRow } = await adminClient
        .from('games')
        .select('game_id')
        .eq('bgg_game_id', Number(item.objectid))
        .single();

      if (gameRow) {
        await adminClient.from('collection_games').upsert({
          collection_id: collectionId,
          game_id: gameRow.game_id,
          bgg_game_id: Number(item.objectid),
          added_at: now,
        });
      }
    }

    await adminClient
      .from('profiles')
      .update({ bgg_username: bggUsername, collection_imported: true })
      .eq('id', userId);

    return { imported: toLink.length, collectionId };
  }
}
