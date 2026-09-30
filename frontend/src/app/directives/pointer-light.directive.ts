import { afterNextRender, DestroyRef, Directive, effect, ElementRef, inject, NgZone } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppearanceService } from '../services/appearance.service';

@Directive({ selector: '[appPointerLight]', standalone: true })
export class PointerLightDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly appearance = inject(AppearanceService);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private reset = () => {};

  constructor() {
    effect(() => {
      if (!this.appearance.motionEnabled()) this.zone.runOutsideAngular(() => this.reset());
    });
    afterNextRender(() => this.zone.runOutsideAngular(() => this.initialize()));
  }

  private initialize(): void {
    const root = this.host.nativeElement;
    const document = root.ownerDocument;
    const window = document.defaultView;
    const glow = root.querySelector<HTMLElement>('.cursor-glow');
    if (!window || !glow) return;

    const mouseAvailable = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const printing = window.matchMedia('print');
    let frame = 0;
    let previousTime = 0;
    let x = 0, y = 0;
    let glowX: number | undefined, glowY = 0;
    let surface: HTMLElement | null = null;
    let nextSurface: HTMLElement | null = null;
    let surfaceDirty = false;

    const enabled = () => mouseAvailable.matches && !printing.matches && this.appearance.motionEnabled() && !document.hidden;
    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      glowX = undefined;
      surfaceDirty = false;
      glow.classList.remove('pointer-lit');
      surface?.classList.remove('pointer-lit');
      surface = nextSurface = null;
    };
    this.reset = reset;

    const paint = (time: number) => {
      frame = 0;
      if (!enabled()) { reset(); return; }

      // Read the active surface before writing styles; never measure on every pointer event.
      const bounds = surfaceDirty && nextSurface?.isConnected ? nextSurface.getBoundingClientRect() : null;
      if (surfaceDirty) {
        if (surface !== nextSurface) surface?.classList.remove('pointer-lit');
        surface = bounds ? nextSurface : null;
        if (surface && bounds) {
          surface.style.setProperty('--light-x', `${Math.max(0, Math.min(bounds.width, x - bounds.left))}px`);
          surface.style.setProperty('--light-y', `${Math.max(0, Math.min(bounds.height, y - bounds.top))}px`);
          surface.classList.add('pointer-lit');
        }
        surfaceDirty = false;
      }

      if (glowX === undefined) { glowX = x; glowY = y; }
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      const easing = 1 - Math.exp(-elapsed / 85);
      glowX += (x - glowX) * easing;
      glowY += (y - glowY) * easing;
      const settled = Math.abs(x - glowX) < .25 && Math.abs(y - glowY) < .25;
      if (settled) { glowX = x; glowY = y; }
      glow.style.setProperty('--cursor-x', `${glowX}px`);
      glow.style.setProperty('--cursor-y', `${glowY}px`);
      glow.classList.add('pointer-lit');
      previousTime = time;
      // Background drift is CSS-only. Cursor tracking has no idle animation loop.
      if (!settled) frame = window.requestAnimationFrame(paint);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !enabled()) { reset(); return; }
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor-light]') : null;
      nextSurface = target && root.contains(target) && !target.matches(':disabled') ? target : null;
      surfaceDirty = true;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const nonMouse = (event: PointerEvent) => { if (event.pointerType !== 'mouse') reset(); };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') reset(); };
    const navigation = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.zone.runOutsideAngular(reset);
    });

    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerdown', nonMouse, { passive: true });
    root.addEventListener('pointerleave', reset);
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('pointercancel', reset);
    document.addEventListener('scroll', reset, { capture: true, passive: true });
    document.addEventListener('visibilitychange', reset);
    document.addEventListener('keydown', keyboard);
    window.addEventListener('resize', reset, { passive: true });
    window.addEventListener('blur', reset);
    window.addEventListener('beforeprint', reset);
    mouseAvailable.addEventListener('change', reset);
    printing.addEventListener('change', reset);

    this.destroyRef.onDestroy(() => {
      reset();
      navigation.unsubscribe();
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerdown', nonMouse);
      root.removeEventListener('pointerleave', reset);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointercancel', reset);
      document.removeEventListener('scroll', reset, true);
      document.removeEventListener('visibilitychange', reset);
      document.removeEventListener('keydown', keyboard);
      window.removeEventListener('resize', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('beforeprint', reset);
      mouseAvailable.removeEventListener('change', reset);
      printing.removeEventListener('change', reset);
      this.reset = () => {};
    });
  }
}
