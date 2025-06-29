import { Injectable } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

@Injectable({ providedIn: 'root' })
export class SpotifyAuthService {
  private sdk: ReturnType<typeof SpotifyApi.withUserAuthorization>;

  constructor() {
    this.sdk = SpotifyApi.withUserAuthorization(
      '4b7033b7a2944608a144cd8232aacf81',
      'https://maslatinomobile.netlify.app/callback',
      [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-playback-state'
      ]
    );
  }

  async loginWithSpotify(): Promise<void> {
    await this.sdk.authenticate();
  }

  getClient() {
    return this.sdk;
  }

  async getAccessToken(): Promise<string | null> {
    const token = await this.sdk.getAccessToken();
    return token?.access_token || null;
  }
}