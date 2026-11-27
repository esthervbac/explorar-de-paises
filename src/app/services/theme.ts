import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  isDark = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Recupera a preferência salva anteriormente, se existir
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDark.set(savedTheme === 'dark');
      }

      effect(() => {
        const dark = this.isDark();
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update((current) => !current);
  }
}
