import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

const DEFAULT_MAX_RETRIES = 8;
const INITIAL_DELAY_MS = 2_000;
const MAX_DELAY_MS = 30_000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfterMs(retryAfter: string | undefined): number | null {
  if (!retryAfter) return null;

  const seconds = Number(retryAfter);
  if (!Number.isNaN(seconds)) {
    return Math.max(seconds, 1) * 1_000;
  }

  const dateMs = Date.parse(retryAfter);
  if (!Number.isNaN(dateMs)) {
    return Math.max(dateMs - Date.now(), 1_000);
  }

  return null;
}

@Injectable()
export class BggHttpService {
  constructor(private readonly httpService: HttpService) {}

  async fetchXml(url: string, maxRetries = DEFAULT_MAX_RETRIES): Promise<string> {
    let delayMs = INITIAL_DELAY_MS;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const response: AxiosResponse<string> = await firstValueFrom(
        this.httpService.get<string>(url, {
          responseType: 'text',
          validateStatus: (status) => status === 200 || status === 202,
        }),
      );

      if (response.status === 200 && response.data) {
        return response.data;
      }

      if (response.status === 202 && attempt < maxRetries) {
        const retryAfterMs = parseRetryAfterMs(
          response.headers['retry-after'] as string | undefined,
        );
        await sleep(retryAfterMs ?? delayMs);
        delayMs = Math.min(delayMs * 2, MAX_DELAY_MS);
        continue;
      }

      throw new ServiceUnavailableException(
        `BGG API returned ${response.status} after ${attempt + 1} attempt(s)`,
      );
    }

    throw new ServiceUnavailableException('BGG API unavailable');
  }
}
