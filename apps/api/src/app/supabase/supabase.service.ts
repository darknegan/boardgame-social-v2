import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly adminClient: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.getOrThrow<string>('SUPABASE_URL');
    const serviceRoleKey = this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');
    this.adminClient = createClient(url, serviceRoleKey);
  }

  getClientForUser(userJwt: string): SupabaseClient {
    const url = this.config.getOrThrow<string>('SUPABASE_URL');
    const anonKey = this.config.getOrThrow<string>('SUPABASE_ANON_KEY');
    return createClient(url, anonKey, {
      global: {
        headers: { Authorization: `Bearer ${userJwt}` },
      },
    });
  }

  getAdminClient(): SupabaseClient {
    return this.adminClient;
  }
}
