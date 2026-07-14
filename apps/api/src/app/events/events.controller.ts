import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateEventDto, GameEvent } from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  listEvents(): Promise<GameEvent[]> {
    return this.eventsService.listEvents();
  }

  @Post()
  createEvent(
    @Req() req: { user: { id: string } },
    @Body() body: CreateEventDto,
  ): Promise<GameEvent> {
    return this.eventsService.createEvent(req.user.id, body.gameEvent);
  }
}
