import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly supabase = inject(SupabaseService, { optional: true })?.supabase;

  async getByUsername(username: string): Promise<UserProfile | null> {
    if (!this.supabase) return null;
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();
    if (error || !data) return null;
    return data as UserProfile;
  }
}
