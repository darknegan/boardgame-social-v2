import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CollectionsApiService } from './collections-api.service';

describe('CollectionsApiService', () => {
  let service: CollectionsApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CollectionsApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should fetch collection', () => {
    service.getCollection().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].name).toBe('Wingspan');
    });

    const req = http.expectOne('collections');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', game_id: 1, bgg_game_id: 266192, name: 'Wingspan', image_url: '', thumbnail_url: '' }]);
  });

  it('should import from BGG with username only', () => {
    service.importFromBgg('testuser').subscribe();
    const req = http.expectOne('collections/import');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser' });
    req.flush({});
  });
});
