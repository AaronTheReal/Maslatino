import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

@Injectable({ providedIn: 'root' })
export class SpotifyPlayerService {
  private player: any;
  private deviceId: string | null = null;

  constructor(private spotifyAuth: SpotifyAuthService) {}

  async initializePlayer(): Promise<void> {
    const token = await this.spotifyAuth.getAccessToken();
    if (!token) {
      console.error('❌ No se encontró un token de acceso');
      return;
    }

    await this.loadSDK();

    return new Promise((resolve) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.player = new window.Spotify.Player({
          name: 'RealMedia Player',
          getOAuthToken: (cb: any) => cb(token),
          volume: 0.8,
        });

        this.player.addListener('ready', ({ device_id }: any) => {
          this.deviceId = device_id;
          console.log('✅ Web Playback SDK listo con device ID:', device_id);
          resolve();
        });

        this.player.addListener('initialization_error', ({ message }: any) =>
          console.error('❌ Error de inicialización:', message)
        );

        this.player.addListener('authentication_error', ({ message }: any) =>
          console.error('❌ Error de autenticación:', message)
        );

        this.player.addListener('account_error', ({ message }: any) =>
          console.error('❌ Error de cuenta:', message)
        );

        this.player.addListener('playback_error', ({ message }: any) =>
          console.error('❌ Error de reproducción:', message)
        );

        this.player.connect();
      };
    });
  }

  addStateListener(callback: (state: any) => void) {
    if (this.player) {
      this.player.addListener('player_state_changed', callback);
    }
  }

  pause() {
    if (this.player) {
      this.player.pause().then(() => console.log('⏸ Pausado'));
    }
  }

  resume() {
    if (this.player) {
      this.player.resume().then(() => console.log('▶️ Reanudado'));
    }
  }

  setVolume(vol: number) {
    if (this.player) {
      this.player.setVolume(vol).then(() =>
        console.log(`🔊 Volumen ajustado a ${vol * 100}%`)
      );
    }
  }

  async nextTrack() {
    if (this.player) {
      await this.player.nextTrack();
      console.log('⏭ Siguiente episodio');
    }
  }

  async previousTrack() {
    if (this.player) {
      await this.player.previousTrack();
      console.log('⏮ Episodio anterior');
    }
  }

  async seekTo(position: number) {
    if (this.player) {
      await this.player.seek(position);
      console.log(`⏱ Avanzado a ${position} ms`);
    }
  }

  async playPodcastByUri(uri: string) {
    if (!this.deviceId) {
      console.error('❌ El reproductor no está listo');
      return;
    }

    const token = await this.spotifyAuth.getAccessToken();
    if (!token) {
      console.error('❌ No se encontró un token de acceso');
      return;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ context_uri: uri }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      console.log('▶️ Podcast iniciado');
    } else {
      const error = await response.json();
      console.error('❌ Error al reproducir podcast:', error);
    }
  }

  private async loadSDK(): Promise<void> {
    if (window.Spotify) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => resolve();
    });
  }
}