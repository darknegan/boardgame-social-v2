import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionItem, GameInfo, GameItem, SelectItem } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamesApiService {
  private readonly http = inject(HttpClient);

  getAll(limit = 24, offset = 0): Observable<GameItem[]> {
    return this.http.get<GameItem[]>('games', { params: { limit, offset } });
  }

  search(name: string): Observable<SelectItem[]> {
    return this.http.get<SelectItem[]>('games/search', { params: { name } });
  }

  getInfo(gameId: number): Observable<CollectionItem> {
    return this.http.get<CollectionItem>('games/info', { params: { gameId } });
  }

  getBggDetails(bggGameId: string): Observable<GameInfo> {
    return this.http.get<GameInfo>('games/bggGameDetails', { params: { bggGameId } });
  }
}
