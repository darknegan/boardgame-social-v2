import { Module } from '@nestjs/common';
import { TierListsController } from './tier-lists.controller';
import { TierListsService } from './tier-lists.service';

@Module({
  controllers: [TierListsController],
  providers: [TierListsService],
})
export class TierListsModule {}
