import { Service } from '@angular/core';

@Service()
export class Favorites {}
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'favorite_countries';

  // Guarda os códigos cca3 (ex: ['BRA', 'FRA'])
  favorites = signal<string[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        try {
          this.favorites.set(JSON.parse(saved));
        } catch {
          this.favorites.set([]);
        }
      }

      // Salva no localStorage sempre que a lista de favoritos mudar
      effect(() => {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favorites()));
      });
    }
  }

  isFavorite(cca3: string): boolean {
    return this.favorites().includes(cca3);
  }

  toggleFavorite(cca3: string): void {
    this.favorites.update((current) =>
      current.includes(cca3) ? current.filter((code) => code !== cca3) : [...current, cca3],
    );
  }
}
