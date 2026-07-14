import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateEventDto, GameEvent } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsApiService {
  private readonly http = inject(HttpClient);

  listEvents(): Observable<GameEvent[]> {
    return this.http.get<GameEvent[]>('events');
  }

  createEvent(dto: CreateEventDto): Observable<GameEvent> {
    return this.http.post<GameEvent>('events', dto);
  }
}
