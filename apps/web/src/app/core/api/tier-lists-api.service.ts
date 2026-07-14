import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveTierListDto, TierList } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TierListsApiService {
  private readonly http = inject(HttpClient);

  getTierList(): Observable<TierList | null> {
    return this.http.get<TierList | null>('tier-lists');
  }

  saveTierList(dto: SaveTierListDto): Observable<TierList> {
    return this.http.put<TierList>('tier-lists', dto);
  }
}
