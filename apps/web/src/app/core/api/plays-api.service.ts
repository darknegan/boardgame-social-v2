import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogPlay, PlayRecord } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaysApiService {
  private readonly http = inject(HttpClient);

  listPlays(limit = 20): Observable<PlayRecord[]> {
    return this.http.get<PlayRecord[]>('plays', { params: { limit } });
  }

  logPlay(play: LogPlay): Observable<PlayRecord> {
    return this.http.post<PlayRecord>('plays', play);
  }
}
