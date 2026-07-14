import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, Subdivision, Venue } from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationsApiService {
  private readonly http = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('locations/countries');
  }

  getSubdivisions(): Observable<Subdivision[]> {
    return this.http.get<Subdivision[]>('locations/subdivisions');
  }

  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>('locations/venues');
  }

  createVenue(venue: Omit<Venue, 'id' | 'created_by'>): Observable<Venue> {
    return this.http.post<Venue>('locations/venues', venue);
  }
}
