import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CollectionItem, CollectionTableItem } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { CollectionsService } from './collections.service';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  getCollection(@Req() req: { user: { id: string } }): Promise<CollectionTableItem[]> {
    return this.collectionsService.getUserCollections(req.user.id);
  }

  @Get('preview')
  getPreview(
    @Req() req: { user: { id: string } },
    @Query('limit') limit?: number,
  ): Promise<CollectionItem[]> {
    return this.collectionsService.getCollectionPreview(req.user.id, limit);
  }

  @Post('import')
  importFromBgg(
    @Req() req: { user: { id: string } },
    @Body() body: { username: string },
  ) {
    return this.collectionsService.importBggCollection(body.username, req.user.id);
  }
}
