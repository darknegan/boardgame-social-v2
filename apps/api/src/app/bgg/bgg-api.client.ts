import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { firstValueFrom } from 'rxjs';
import { GameInfo, ThingInfo } from '@bgs/shared';

const BGG_BASE = 'https://boardgamegeek.com/xmlapi2';
const MAX_RETRIES = 6;
const INITIAL_BACKOFF_MS = 1000;

@Injectable()
export class BggApiClient {
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    textNodeName: '#text',
  });

  constructor(private readonly httpService: HttpService) {}

  async getGameInfo(bggGameId: string): Promise<GameInfo> {
    const url = `${BGG_BASE}/thing?id=${bggGameId}&type=boardgame`;
    const xml = await this.fetchWithRetry(url);
    const parsed = this.parser.parse(xml);
    const item = parsed?.items?.item;
    if (!item) {
      throw new Error('Game not found on BGG');
    }

    const nameNode = Array.isArray(item.name)
      ? item.name.find((n: { type: string }) => n.type === 'primary')
      : item.name;

    const links = item.link;

    return {
      gameId: 0,
      bggId: Number(item.id),
      type: item.type ?? 'boardgame',
      name: nameNode?.value ?? nameNode?.['#text'] ?? 'Unknown',
      imageUrl: item.image ?? '',
      thumbnailUrl: item.thumbnail ?? '',
      description: item.description ?? '',
      yearpublished: Number(item.yearpublished?.value ?? 0),
      minplayers: Number(item.minplayers?.value ?? 0),
      maxplayers: Number(item.maxplayers?.value ?? 0),
      playingTime: Number(item.playingtime?.value ?? 0),
      minPlayTime: Number(item.minplaytime?.value ?? 0),
      maxPlayTime: Number(item.maxplaytime?.value ?? 0),
      minAge: Number(item.minage?.value ?? 0),
      playerCountPoll: [],
      suggestedPlayerCount: { bestWith: '', recommendedWith: '' },
      gameCategories: this.parseLinks(links, 'boardgamecategory'),
      gameMechanics: this.parseLinks(links, 'boardgamemechanic'),
      gameFamilies: this.parseLinks(links, 'boardgamefamily'),
      gameExpansions: [],
      gameAccessories: this.parseLinks(links, 'boardgameaccessory'),
      gameDesigners: this.parseLinks(links, 'boardgamedesigner'),
      gameArtists: this.parseLinks(links, 'boardgameartist'),
      gamePublishers: this.parseLinks(links, 'boardgamepublisher'),
    };
  }

  async fetchCollectionXml(username: string): Promise<string> {
    const url = new URL(`${BGG_BASE}/collection`);
    url.searchParams.set('username', username);
    url.searchParams.set('own', '1');
    url.searchParams.set('stats', '1');
    return this.fetchWithRetry(url.toString());
  }

  private async fetchWithRetry(url: string): Promise<string> {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const response = await firstValueFrom(
        this.httpService.get<string>(url, {
          validateStatus: (status) => status === 200 || status === 202,
          responseType: 'text',
        }),
      );

      if (response.status === 202) {
        const delay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await this.sleep(delay);
        continue;
      }

      return response.data;
    }

    throw new Error('BGG API did not respond in time (202 retries exhausted)');
  }

  private parseLinks(links: unknown, type: string): ThingInfo[] {
    if (!links || typeof links !== 'object') return [];
    const linkNode = (links as { link?: unknown }).link;
    if (!linkNode) return [];

    const linkArray = Array.isArray(linkNode) ? linkNode : [linkNode];
    return linkArray
      .filter((l: { type?: string }) => l.type === type)
      .map((l: { id: string; value: string }) => ({
        type,
        id: Number(l.id),
        value: l.value,
      }));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
