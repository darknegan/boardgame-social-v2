import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { OnboardingForm, UserProfile } from '@bgs/shared';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService, { optional: true })?.supabase;
  private readonly router = inject(Router);

  private readonly _session = signal<Session | null>(null);
  private readonly _profile = signal<UserProfile | null>(null);
  private readonly _loading = signal(true);
  private _readyResolve: (() => void) | null = null;
  private readonly _ready = new Promise<void>((resolve) => {
    this._readyResolve = resolve;
  });

  readonly session = this._session.asReadonly();
  readonly profile = this._profile.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly user = computed(() => this._session()?.user ?? null);

  private readonly devBypass = computed(
    () => environment.devPreview && !environment.supabaseUrl,
  );

  readonly isAuthenticated = computed(
    () => this.devBypass() || !!this._session(),
  );
  readonly hasProfile = computed(
    () => this.devBypass() || !!this._profile()?.username,
  );

  waitUntilReady(): Promise<void> {
    if (!this._loading()) return Promise.resolve();
    return this._ready;
  }

  async init(): Promise<void> {
    if (!this.supabase) {
      this._loading.set(false);
      this._readyResolve?.();
      return;
    }

    const { data } = await this.supabase.auth.getSession();
    this._session.set(data.session);
    if (data.session?.user) {
      await this.loadProfile(data.session.user.id);
    }
    this._loading.set(false);
    this._readyResolve?.();

    this.supabase.auth.onAuthStateChange(async (_event, session) => {
      this._session.set(session);
      if (session?.user) {
        await this.loadProfile(session.user.id);
      } else {
        this._profile.set(null);
      }
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not configured');
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signUp(email: string, password: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not configured');
    const { error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    if (this.supabase) await this.supabase.auth.signOut();
    this._profile.set(null);
    await this.router.navigate(['/login']);
  }

  async resetPassword(email: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not configured');
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
  }

  async updatePassword(password: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not configured');
    const { error } = await this.supabase.auth.updateUser({ password });
    if (error) throw error;
  }

  async updateProfile(updates: Partial<OnboardingForm>): Promise<void> {
    const userId = this.user()?.id;
    if (!userId || !this.supabase) throw new Error('Not authenticated');

    const { error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    await this.loadProfile(userId);
  }

  async uploadAvatar(file: File): Promise<string> {
    const userId = this.user()?.id;
    if (!userId || !this.supabase) throw new Error('Not authenticated');

    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await this.supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = this.supabase.storage.from('avatars').getPublicUrl(path);
    await this.updateProfile({ profile_picture_url: data.publicUrl });
    return data.publicUrl;
  }

  async loadProfile(userId: string): Promise<void> {
    if (!this.supabase) return;
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      this._profile.set(data as UserProfile);
    }
  }

  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    if (!this.supabase) return null;
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error || !data) return null;
    return data as UserProfile;
  }

  getAccessToken(): string | null {
    return this._session()?.access_token ?? null;
  }
}
