import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GameEvent } from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class EventsService {
  constructor(private readonly supabase: SupabaseService) {}

  async listEvents(): Promise<GameEvent[]> {
    const adminClient = this.supabase.getAdminClient();
    const { data, error } = await adminClient
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });

    if (error) throw new InternalServerErrorException(error.message);
    return data ?? [];
  }

  async createEvent(userId: string, event: GameEvent): Promise<GameEvent> {
    const adminClient = this.supabase.getAdminClient();
    const now = new Date().toISOString();

    const { data, error } = await adminClient
      .from('events')
      .insert({
        title: event.title,
        description: event.description || null,
        kind: event.kind,
        image: event.image,
        created_by: userId,
        location_id: event.location_id,
        start_time: event.start_time,
        end_time: event.end_time,
        recurring: event.recurring ?? false,
        min_players: event.min_players,
        max_players: event.max_players,
        experience_required: event.experience_required,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !data) {
      throw new InternalServerErrorException(error?.message ?? 'Could not create event');
    }

    return data;
  }
}
