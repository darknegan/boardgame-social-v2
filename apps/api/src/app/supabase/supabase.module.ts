import { Global, Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  providers: [SupabaseService, JwtAuthGuard],
  exports: [SupabaseService, JwtAuthGuard],
})
export class SupabaseModule {}
