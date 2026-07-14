import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [BggModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
