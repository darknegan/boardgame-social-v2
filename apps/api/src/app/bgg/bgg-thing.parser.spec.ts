import { describe, expect, it } from 'vitest';
import { parseBggThingItem } from './bgg-thing.parser';

describe('parseBggThingItem', () => {
  it('extracts categories, mechanics, and designers from BGG link nodes', () => {
    const gameInfo = parseBggThingItem({
      id: '174430',
      type: 'boardgame',
      name: [
        { type: 'alternate', value: 'Gloomhaven Jaws' },
        { type: 'primary', value: 'Gloomhaven' },
      ],
      image: 'https://cf.geekdo-images.com/image.jpg',
      thumbnail: 'https://cf.geekdo-images.com/thumb.jpg',
      description: 'A game of tactical combat.',
      yearpublished: { value: '2017' },
      minplayers: { value: '1' },
      maxplayers: { value: '4' },
      playingtime: { value: '120' },
      minplaytime: { value: '60' },
      maxplaytime: { value: '120' },
      minage: { value: '14' },
      link: [
        { type: 'boardgamecategory', id: '1022', value: 'Adventure' },
        { type: 'boardgamecategory', id: '1010', value: 'Fantasy' },
        { type: 'boardgamemechanic', id: '2011', value: 'Modular Board' },
        { type: 'boardgamedesigner', id: '69851', value: 'Isaac Childres' },
        { type: 'boardgamepublisher', id: '19227', value: 'Cephalofair Games' },
      ],
    });

    expect(gameInfo.bggId).toBe(174430);
    expect(gameInfo.name).toBe('Gloomhaven');
    expect(gameInfo.gameCategories).toEqual([
      { type: 'boardgamecategory', id: 1022, value: 'Adventure' },
      { type: 'boardgamecategory', id: 1010, value: 'Fantasy' },
    ]);
    expect(gameInfo.gameMechanics).toEqual([
      { type: 'boardgamemechanic', id: 2011, value: 'Modular Board' },
    ]);
    expect(gameInfo.gameDesigners).toEqual([
      { type: 'boardgamedesigner', id: 69851, value: 'Isaac Childres' },
    ]);
    expect(gameInfo.gamePublishers).toEqual([
      { type: 'boardgamepublisher', id: 19227, value: 'Cephalofair Games' },
    ]);
  });

  it('handles a single link node and missing optional fields', () => {
    const gameInfo = parseBggThingItem({
      id: '1',
      name: { type: 'primary', value: 'Test Game' },
      link: { type: 'boardgamemechanic', id: '2001', value: 'Action Drafting' },
    });

    expect(gameInfo.name).toBe('Test Game');
    expect(gameInfo.gameMechanics).toEqual([
      { type: 'boardgamemechanic', id: 2001, value: 'Action Drafting' },
    ]);
    expect(gameInfo.gameCategories).toEqual([]);
    expect(gameInfo.gameDesigners).toEqual([]);
  });
});
