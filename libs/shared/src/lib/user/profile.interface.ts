export interface UserProfile {
  id: string;
  collection_imported: boolean;
  created_at: string;
  bgg_username?: string;
  display_name?: string;
  countryCode?: string;
  subdivision?: string;
  city?: string;
  profile_picture_url?: string;
  username: string | null;
}

export type OnboardingForm = Omit<
  UserProfile,
  'id' | 'collection_imported' | 'created_at'
>;
