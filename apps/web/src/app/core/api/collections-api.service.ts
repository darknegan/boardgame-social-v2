import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionItem, CollectionTableItem } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollectionsApiService {
  private readonly http = inject(HttpClient);

  getCollection(): Observable<CollectionTableItem[]> {
    return this.http.get<CollectionTableItem[]>('collections');
  }

  getPreview(limit = 12): Observable<CollectionItem[]> {
    return this.http.get<CollectionItem[]>('collections/preview', { params: { limit } });
  }

  importFromBgg(username: string): Observable<unknown> {
    return this.http.post('collections/import', { username });
  }
}
