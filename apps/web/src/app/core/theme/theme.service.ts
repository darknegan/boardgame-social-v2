import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'bgs-theme';
  private readonly _theme = signal<ThemeMode>(this.readStoredTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    this.apply(this._theme());
  }

  toggle(): void {
    const next: ThemeMode = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    this.apply(next);
    localStorage.setItem(this.storageKey, next);
  }

  private apply(theme: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private readStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'dark' ? 'dark' : 'light';
  }
}
