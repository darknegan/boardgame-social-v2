export type EventKind = 'playtest' | 'regular' | 'demo';
export type ExperienceLevel = 'any' | 'low' | 'medium' | 'high';
export interface GameEvent {
    id?: string;
    title: string;
    description: string;
    kind: EventKind;
    image: string;
    created_by: string;
    location_id: string;
    start_time: string;
    end_time: string;
    recurring: boolean;
    min_players: number;
    max_players: number;
    experience_required: ExperienceLevel;
    created_at?: string;
    updated_at?: string;
}
export interface CreateEventDto {
    gameEvent: GameEvent;
}
