import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BggApiClient } from './bgg-api.client';
import { BggHttpService } from './bgg-http.service';

@Module({
  imports: [HttpModule],
  providers: [BggHttpService, BggApiClient],
  exports: [BggHttpService, BggApiClient],
})
export class BggModule {}
