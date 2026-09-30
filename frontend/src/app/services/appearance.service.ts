import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, DestroyRef, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>('light');
  readonly motionPaused = signal(false);
  readonly systemReducedMotion = signal(false);
  readonly motionEnabled = computed(() => !this.motionPaused() && !this.systemReducedMotion());

  constructor() {
    if (this.browser) {
      const root = this.document.documentElement;
      this.theme.set(root.dataset['theme'] === 'dark' ? 'dark' : 'light');
      this.motionPaused.set(root.dataset['motionPreference'] === 'paused');
      const preference = this.document.defaultView!.matchMedia('(prefers-reduced-motion: reduce)');
      this.systemReducedMotion.set(preference.matches);
      const updatePreference = (event: MediaQueryListEvent) => this.systemReducedMotion.set(event.matches);
      preference.addEventListener('change', updatePreference);
      this.destroyRef.onDestroy(() => preference.removeEventListener('change', updatePreference));
    }

    effect(() => {
      const root = this.document.documentElement;
      root.setAttribute('data-theme', this.theme());
      root.setAttribute('data-motion', this.motionEnabled() ? 'full' : 'reduced');
      root.setAttribute('data-motion-preference', this.motionPaused() ? 'paused' : 'full');
      this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', this.theme() === 'dark' ? '#101c18' : '#f6f5f0');
      this.document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', this.theme());
    });
  }

  toggleTheme(): void {
    this.theme.update((theme) => theme === 'light' ? 'dark' : 'light');
    this.savePreference('portfolio-theme', this.theme());
  }

  toggleMotion(): void {
    this.motionPaused.update((paused) => !paused);
    this.savePreference('portfolio-motion', this.motionPaused() ? 'paused' : 'full');
  }

  private savePreference(key: string, value: string): void {
    try { this.document.defaultView?.localStorage.setItem(key, value); }
    catch { /* The controls still work when browser storage is unavailable. */ }
  }
}
