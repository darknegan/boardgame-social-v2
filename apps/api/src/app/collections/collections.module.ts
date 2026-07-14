import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
  imports: [HttpModule, BggModule],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
