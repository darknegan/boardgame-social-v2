import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const mockAuth = {
    waitUntilReady: vi.fn().mockResolvedValue(undefined),
    isAuthenticated: vi.fn(),
    loading: signal(false),
  };

  beforeEach(() => {
    mockAuth.waitUntilReady.mockClear();
    mockAuth.isAuthenticated.mockReset();
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: { createUrlTree: vi.fn((path: string[]) => path) } },
      ],
    });
  });

  it('allows authenticated users', async () => {
    mockAuth.isAuthenticated.mockReturnValue(true);
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result).toBe(true);
  });

  it('redirects unauthenticated users to login', async () => {
    mockAuth.isAuthenticated.mockReturnValue(false);
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result).toEqual(['/login']);
  });

  it('waits for auth to be ready', async () => {
    mockAuth.isAuthenticated.mockReturnValue(true);
    await TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(mockAuth.waitUntilReady).toHaveBeenCalled();
  });
});
