import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CollectionItem, GameInfo, GameItem, SelectItem } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { GamesService } from './games.service';

@Controller('games')
@UseGuards(JwtAuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAll(
    @Query('limit') limit = 24,
    @Query('offset') offset = 0,
  ): Promise<GameItem[]> {
    return this.gamesService.getAllGames(Number(limit), Number(offset));
  }

  @Get('info')
  getGame(@Query('gameId') gameId: number): Promise<CollectionItem> {
    return this.gamesService.getSingleGame(Number(gameId));
  }

  @Get('search')
  gameSearch(@Query('name') name: string): Promise<SelectItem[]> {
    return this.gamesService.gameSearch(name);
  }

  @Get('bggGameDetails')
  getBggGameDetails(@Query('bggGameId') bggGameId: string): Promise<GameInfo> {
    return this.gamesService.getBggGameDetails(bggGameId);
  }
}
