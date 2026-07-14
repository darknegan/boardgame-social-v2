export interface Collection {
    id: string;
    added_at: string;
    bgg_game_id: number;
    name: string;
    image_url: string;
    last_synced_at: string;
    user_id: string;
    thumbnail_url: string;
    num_plays: number;
    source: 'bgg';
}
export interface CollectionItem {
    bggGameId: number;
    gameId: number;
    imageUrl: string;
    name: string;
    thumbnailUrl: string;
    playerCount?: number;
}
export interface CollectionTableItem {
    id: string;
    game_id: number;
    bgg_game_id: number;
    image_url: string;
    name: string;
    thumbnail_url: string;
}
export interface MissingIds {
    missing_id: number;
}
