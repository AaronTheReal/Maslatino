import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PlayerSource {
  type: 'Radio' | 'Podcast' | 'Episodio';
  id?: string;
  url: string;
  title?: string;
  artwork?: string;
  isLive?: boolean;
}

export interface PlayerState {
  source: PlayerSource | null;
  isPlaying: boolean;
  volume: number;
  position: number;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio = new Audio(); // ✅ ESTA ES LA LÍNEA QUE FALTABA

  private _state$ = new BehaviorSubject<PlayerState>({
    source: null,
    isPlaying: false,
    volume: 1,
    position: 0,
    duration: 0
  });

  readonly state$ = this._state$.asObservable();

  get snapshot(): PlayerState {
    return this._state$.value;
  }

  constructor() {
    this.audio.preload = 'auto';

    this.audio.addEventListener('timeupdate', () => {
      this._patch({
        position: this.audio.currentTime,
        duration: this.audio.duration
      });
    });

    this.audio.addEventListener('play', () => this._patch({ isPlaying: true }));
    this.audio.addEventListener('pause', () => this._patch({ isPlaying: false }));
    this.audio.addEventListener('ended', () => this._patch({ isPlaying: false, position: 0 }));
  }

  play(source: PlayerSource) {
    if (this._state$.value.source?.url !== source.url) {
      this.audio.src = source.url;
    }
    this.audio.play();
    this._patch({ source, isPlaying: true });
  }

  pause() {
    this.audio.pause();
    this._patch({ isPlaying: false });
  }

  toggle() {
    this._state$.value.isPlaying ? this.pause() : this.audio.play();
  }

  private _patch(update: Partial<PlayerState>) {
    this._state$.next({ ...this._state$.value, ...update });
  }
  clear() {
  this.audio.pause();
  this.audio.src = '';
  this._patch({
    source: null,
    isPlaying: false,
    position: 0,
    duration: 0
  });
}

}
