import { Injectable } from '@nestjs/common';
import { SaveTierListDto, TierList } from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TierListsService {
  constructor(private readonly supabase: SupabaseService) {}

  async getTierList(userId: string): Promise<TierList | null> {
    const adminClient = this.supabase.getAdminClient();
    const { data: list, error } = await adminClient
      .from('tier_lists')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !list) return null;

    const { data: items } = await adminClient
      .from('tier_list_items')
      .select('*')
      .eq('tier_list_id', list.id)
      .order('position');

    return { ...list, items: items ?? [] };
  }

  async saveTierList(userId: string, dto: SaveTierListDto): Promise<TierList> {
    const adminClient = this.supabase.getAdminClient();
    const now = new Date().toISOString();

    const { data: list, error: listError } = await adminClient
      .from('tier_lists')
      .upsert({ user_id: userId, name: dto.name, updated_at: now }, { onConflict: 'user_id' })
      .select()
      .single();

    if (listError || !list) throw new Error(listError?.message ?? 'Failed to save tier list');

    await adminClient.from('tier_list_items').delete().eq('tier_list_id', list.id);

    if (dto.items.length) {
      const rows = dto.items.map((item) => ({
        tier_list_id: list.id,
        game_id: item.game_id,
        bgg_game_id: item.bgg_game_id,
        name: item.name,
        thumbnail_url: item.thumbnail_url,
        tier: item.tier,
        position: item.position,
      }));
      const { error: itemsError } = await adminClient.from('tier_list_items').insert(rows);
      if (itemsError) throw new Error(itemsError.message);
    }

    return { ...list, items: dto.items };
  }
}
