import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { SaveTierListDto, TierList } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { TierListsService } from './tier-lists.service';

@Controller('tier-lists')
export class TierListsController {
  constructor(private readonly tierListsService: TierListsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getTierList(@Req() req: { user: { id: string } }): Promise<TierList | null> {
    return this.tierListsService.getTierList(req.user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  saveTierList(
    @Req() req: { user: { id: string } },
    @Body() body: SaveTierListDto,
  ): Promise<TierList> {
    return this.tierListsService.saveTierList(req.user.id, body);
  }
}
