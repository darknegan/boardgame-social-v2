import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Country, Subdivision, Venue } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('countries')
  getCountries(): Promise<Country[]> {
    return this.locationsService.getCountries();
  }

  @Get('subdivisions')
  getSubdivisions(): Promise<Subdivision[]> {
    return this.locationsService.getSubdivisions();
  }

  @Get('venues')
  @UseGuards(JwtAuthGuard)
  getVenues(@Req() req: { user: { id: string } }): Promise<Venue[]> {
    return this.locationsService.getUserVenues(req.user.id);
  }

  @Post('venues')
  @UseGuards(JwtAuthGuard)
  createVenue(
    @Req() req: { user: { id: string } },
    @Body() body: Omit<Venue, 'id' | 'created_by'>,
  ): Promise<Venue> {
    return this.locationsService.createVenue(req.user.id, body);
  }
}
