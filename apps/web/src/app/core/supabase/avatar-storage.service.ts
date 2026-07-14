import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

const AVATAR_BUCKET = 'avatars';
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

@Injectable({ providedIn: 'root' })
export class AvatarStorageService {
  private readonly supabase = inject(SupabaseService, { optional: true })?.supabase;

  validateAvatarFile(file: File): string | null {
    if (!ALLOWED_TYPES.has(file.type)) {
      return 'Please choose a JPEG, PNG, WebP, or GIF image.';
    }
    if (file.size > MAX_AVATAR_BYTES) {
      return 'Image must be 2 MB or smaller.';
    }
    return null;
  }

  async uploadAvatar(userId: string, file: File): Promise<string> {
    if (!this.supabase) throw new Error('Supabase is not configured');

    const validationError = this.validateAvatarFile(file);
    if (validationError) throw new Error(validationError);

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${userId}/avatar.${ext}`;

    const { error } = await this.supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });

    if (error) throw error;

    const { data } = this.supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
    return `${data.publicUrl}?t=${Date.now()}`;
  }

  async removeAvatar(userId: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not configured');

    const { data, error: listError } = await this.supabase.storage
      .from(AVATAR_BUCKET)
      .list(userId);

    if (listError) throw listError;
    if (!data?.length) return;

    const paths = data.map((item) => `${userId}/${item.name}`);
    const { error } = await this.supabase.storage.from(AVATAR_BUCKET).remove(paths);
    if (error) throw error;
  }
}
