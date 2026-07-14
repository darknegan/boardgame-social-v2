import { Injectable } from '@nestjs/common';
import { Country, Subdivision, Venue } from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LocationsService {
  constructor(private readonly supabase: SupabaseService) {}

  async getCountries(): Promise<Country[]> {
    const { data, error } = await this.supabase.getAdminClient().from('countries').select('*');
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getSubdivisions(): Promise<Subdivision[]> {
    const { data, error } = await this.supabase.getAdminClient().from('subdivisions').select('*');
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async getUserVenues(userId: string): Promise<Venue[]> {
    const { data, error } = await this.supabase.getAdminClient().rpc('get_user_locations', {
      user_id: userId,
    });
    if (error) throw new Error(error.message);
    return data ?? [];
  }

  async createVenue(
    userId: string,
    venue: Omit<Venue, 'id' | 'created_by'>,
  ): Promise<Venue> {
    const { data, error } = await this.supabase
      .getAdminClient()
      .from('locations')
      .insert({ ...venue, created_by: userId })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
