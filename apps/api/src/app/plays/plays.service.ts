import { Injectable } from '@nestjs/common';
import { LogPlay, PlayRecord } from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PlaysService {
  constructor(private readonly supabase: SupabaseService) {}

  async listPlays(userId: string, limit: number): Promise<PlayRecord[]> {
    const { data, error } = await this.supabase
      .getAdminClient()
      .from('plays')
      .select('*')
      .eq('created_by', userId)
      .order('start_time', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async logPlay(userId: string, play: LogPlay): Promise<PlayRecord> {
    const adminClient = this.supabase.getAdminClient();
    const now = new Date().toISOString();

    const { data: playRow, error: playError } = await adminClient
      .from('plays')
      .insert({
        created_by: userId,
        description: play.description,
        game_id: play.game.game_id,
        location_id: play.location_id,
        start_time: play.start_time,
        created_at: now,
      })
      .select()
      .single();

    if (playError || !playRow) throw new Error(playError?.message ?? 'Failed to log play');

    if (play.players.length) {
      const participants = play.players.map((p) => ({
        play_id: playRow.id,
        user_id: p.user_id ?? null,
        name: p.name,
        score: p.score,
        winner: p.winner ?? false,
      }));
      const { error: partError } = await adminClient.from('play_participants').insert(participants);
      if (partError) throw new Error(partError.message);
    }

    return playRow;
  }
}
