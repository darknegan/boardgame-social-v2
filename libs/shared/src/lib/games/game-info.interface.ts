export interface GameInfo {
  gameId: number;
  bggId: number;
  type: string;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  yearpublished: number;
  minplayers: number;
  maxplayers: number;
  playingTime: number;
  minPlayTime: number;
  maxPlayTime: number;
  minAge: number;
  playerCountPoll: PlayerCountPoll[];
  suggestedPlayerCount: SuggestedPlayerCount;
  gameCategories: ThingInfo[];
  gameMechanics: ThingInfo[];
  gameFamilies: ThingInfo[];
  gameExpansions: ExpansionInfo[];
  gameAccessories: ThingInfo[];
  gameDesigners: ThingInfo[];
  gameArtists: ThingInfo[];
  gamePublishers: ThingInfo[];
}

export interface PlayerCountPoll {
  numPlayers: string;
  best: number;
  recommended: number;
  notRecommended: number;
}

export interface SuggestedPlayerCount {
  bestWith: string;
  recommendedWith: string;
}

export interface ThingInfo {
  type: string;
  id: number;
  value: string;
}

export interface ExpansionInfo {
  type: string;
  id: number;
  value: string;
  imageUrl: string;
  thumbnailUrl: string;
  suggestedPlayerCount: SuggestedPlayerCount;
  minPlayTime: number;
  maxPlayTime: number;
  minplayers: number;
  maxplayers: number;
}
