import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  CollectionItem,
  GameInfo,
  GameItem,
  GameTableItem,
  SelectItem,
} from '@bgs/shared';
import { BggApiClient } from '../bgg/bgg-api.client';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class GamesService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly bggClient: BggApiClient,
  ) {}

  async getAllGames(limit: number, offset: number): Promise<GameItem[]> {
    const adminClient: SupabaseClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient.rpc('get_game_details', {
      p_limit: limit,
      p_offset: offset,
    });
    if (error) throw new Error(error.message);

    return (data ?? []).map((item: GameTableItem) => ({
      gameId: item.game_id,
      bggGameId: item.bgg_game_id,
      name: item.name,
      imageUrl: item.image_url,
      thumbnailUrl: item.thumbnail_url,
      rank: item.rank,
      average: item.average,
      bayesAverage: item.bayesaverage,
      playerCount: item.player_count,
      yearPublished: item.yearpublished,
      abstractsRank: item.abstracts_rank,
      cgsRank: item.cgs_rank,
      childrensGamesRank: item.childrensgames_rank,
      familyGamesRank: item.familygames_rank,
      partyGamesRank: item.partygames_rank,
      strategyGamesRank: item.strategygames_rank,
      thematicRank: item.thematic_rank,
      warGamesRank: item.wargames_rank,
    }));
  }

  async getSingleGame(gameId: number): Promise<CollectionItem> {
    const adminClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient.rpc('get_game', { id: gameId });
    if (error) throw new Error(error.message);

    return {
      bggGameId: data.bgg_game_id,
      gameId: data.game_id,
      name: data.name,
      imageUrl: data.image_url,
      thumbnailUrl: data.thumbnail_url,
    };
  }

  async gameSearch(name: string): Promise<SelectItem[]> {
    const adminClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient.rpc('search_game_name', {
      search_name: name,
    });
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getBggGameDetails(bggGameId: string): Promise<GameInfo> {
    return this.bggClient.getGameInfo(bggGameId);
  }
}
