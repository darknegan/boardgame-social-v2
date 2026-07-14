import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CollectionsModule } from './collections/collections.module';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { LocationsModule } from './locations/locations.module';
import { PlaysModule } from './plays/plays.module';
import { SocialModule } from './social/social.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TierListsModule } from './tier-lists/tier-lists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env['NODE_ENV'] === 'production' ? undefined : 'apps/api/.env',
    }),
    SupabaseModule,
    CollectionsModule,
    GamesModule,
    EventsModule,
    LocationsModule,
    PlaysModule,
    SocialModule,
    TierListsModule,
  ],
})
export class AppModule {}
