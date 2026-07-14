export interface GameItem {
  gameId: number;
  bggGameId: number;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
  rank: number;
  average: number;
  bayesAverage: number;
  playerCount: number;
  yearPublished: number;
  abstractsRank: number;
  cgsRank: number;
  childrensGamesRank: number;
  familyGamesRank: number;
  partyGamesRank: number;
  strategyGamesRank: number;
  thematicRank: number;
  warGamesRank: number;
}

export interface GameTableItem {
  game_id: number;
  bgg_game_id: number;
  name: string;
  image_url: string;
  thumbnail_url: string;
  rank: number;
  average: number;
  bayesaverage: number;
  player_count: number;
  yearpublished: number;
  abstracts_rank: number;
  cgs_rank: number;
  childrensgames_rank: number;
  familygames_rank: number;
  partygames_rank: number;
  strategygames_rank: number;
  thematic_rank: number;
  wargames_rank: number;
}
