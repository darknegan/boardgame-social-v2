export type TierRank = 'S' | 'A' | 'B' | 'C' | 'D';

export interface TierListItem {
  game_id: number;
  bgg_game_id: number;
  name: string;
  thumbnail_url: string;
  tier: TierRank;
  position: number;
}

export interface TierList {
  id: string;
  user_id: string;
  name: string;
  items: TierListItem[];
  updated_at: string;
}

export interface SaveTierListDto {
  name: string;
  items: TierListItem[];
}
