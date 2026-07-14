import { GameInfo, ThingInfo } from '@bgs/shared';

interface BggLink {
  type?: string;
  id?: string | number;
  value?: string;
}

interface BggName {
  type?: string;
  value?: string;
  '#text'?: string;
}

interface BggValueNode {
  value?: string | number;
}

interface BggThingItem {
  id?: string | number;
  type?: string;
  name?: BggName | BggName[];
  image?: string;
  thumbnail?: string;
  description?: string;
  yearpublished?: BggValueNode;
  minplayers?: BggValueNode;
  maxplayers?: BggValueNode;
  playingtime?: BggValueNode;
  minplaytime?: BggValueNode;
  maxplaytime?: BggValueNode;
  minage?: BggValueNode;
  link?: BggLink | BggLink[];
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseLinks(links: BggLink | BggLink[] | undefined, linkType: string): ThingInfo[] {
  return asArray(links)
    .filter((link) => link.type === linkType)
    .map((link) => ({
      type: link.type ?? linkType,
      id: Number(link.id),
      value: link.value ?? '',
    }));
}

function parsePrimaryName(nameNode: BggName | BggName[] | undefined): string {
  const names = asArray(nameNode);
  const primary = names.find((name) => name.type === 'primary') ?? names[0];
  return primary?.value ?? primary?.['#text'] ?? 'Unknown';
}

function parseNumber(value: BggValueNode | undefined): number {
  return Number(value?.value ?? 0);
}

export function parseBggThingItem(item: BggThingItem): GameInfo {
  return {
    gameId: 0,
    bggId: Number(item.id),
    type: item.type ?? 'boardgame',
    name: parsePrimaryName(item.name),
    imageUrl: item.image ?? '',
    thumbnailUrl: item.thumbnail ?? '',
    description: item.description ?? '',
    yearpublished: parseNumber(item.yearpublished),
    minplayers: parseNumber(item.minplayers),
    maxplayers: parseNumber(item.maxplayers),
    playingTime: parseNumber(item.playingtime),
    minPlayTime: parseNumber(item.minplaytime),
    maxPlayTime: parseNumber(item.maxplaytime),
    minAge: parseNumber(item.minage),
    playerCountPoll: [],
    suggestedPlayerCount: { bestWith: '', recommendedWith: '' },
    gameCategories: parseLinks(item.link, 'boardgamecategory'),
    gameMechanics: parseLinks(item.link, 'boardgamemechanic'),
    gameFamilies: parseLinks(item.link, 'boardgamefamily'),
    gameExpansions: [],
    gameAccessories: parseLinks(item.link, 'boardgameaccessory'),
    gameDesigners: parseLinks(item.link, 'boardgamedesigner'),
    gameArtists: parseLinks(item.link, 'boardgameartist'),
    gamePublishers: parseLinks(item.link, 'boardgamepublisher'),
  };
}
