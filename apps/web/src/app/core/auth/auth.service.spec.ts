import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    await service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devBypass allows auth when no supabase configured', () => {
    expect(service.isAuthenticated()).toBe(true);
    expect(service.hasProfile()).toBe(true);
  });

  it('waitUntilReady resolves after init', async () => {
    await expect(service.waitUntilReady()).resolves.toBeUndefined();
  });
});
