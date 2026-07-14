import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LogPlay, PlayRecord } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { PlaysService } from './plays.service';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listPlays(
    @Req() req: { user: { id: string } },
    @Query('limit') limit = 20,
  ): Promise<PlayRecord[]> {
    return this.playsService.listPlays(req.user.id, Number(limit));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  logPlay(
    @Req() req: { user: { id: string } },
    @Body() body: LogPlay,
  ): Promise<PlayRecord> {
    return this.playsService.logPlay(req.user.id, body);
  }
}
