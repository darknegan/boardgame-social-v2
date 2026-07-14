export interface LogPlay {
  created_by: string;
  description: string;
  game: LogPlayGame;
  location_id: string;
  start_time: string;
  players: LogPlayPlayer[];
}

export interface LogPlayPlayer {
  name: string;
  user_id?: string;
  score: number;
  winner?: boolean;
}

export interface LogPlayGame {
  game_id: string;
  name: string;
}

export interface PlayRecord {
  id: string;
  created_by: string;
  description: string;
  game_id: string;
  location_id: string;
  start_time: string;
  created_at: string;
}
