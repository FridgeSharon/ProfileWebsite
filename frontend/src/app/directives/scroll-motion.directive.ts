import { afterNextRender, DestroyRef, Directive, ElementRef, inject, NgZone } from '@angular/core';
import { AppearanceService } from '../services/appearance.service';

const REVEAL_TARGETS = [
  '.hero-copy', '.system-map', '.facts', '.section-heading', '.project', '.entry',
  '.about-grid', '.strengths article', '.skills-grid article', '.education-list article',
  '.education-layout aside', '.contact-inner', '.technical-hero', '.decision-grid article',
  '.flow li', '.technical-footer', '.cv-toolbar', '.cv-sheet',
].join(', ');

@Directive({ selector: '[appScrollMotion]', standalone: true })
export class ScrollMotionDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly appearance = inject(AppearanceService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Prerendered content stays visible; motion is added only after browser rendering.
    afterNextRender(() => this.zone.runOutsideAngular(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const root = this.host.nativeElement;
      const seen = new WeakSet<Element>();
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (this.appearance.motionEnabled()) entry.target.classList.add('scroll-enter');
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      const scan = () => {
        for (const target of root.querySelectorAll<HTMLElement>(REVEAL_TARGETS)) {
          if (seen.has(target)) continue;
          seen.add(target);
          observer.observe(target);
        }
      };
      const finish = (event: AnimationEvent) => {
        if (event.animationName === 'scroll-arrive') (event.target as HTMLElement).classList.remove('scroll-enter');
      };
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const removed of record.removedNodes) {
            if (!(removed instanceof Element)) continue;
            observer.unobserve(removed);
            removed.querySelectorAll(REVEAL_TARGETS).forEach((element) => observer.unobserve(element));
          }
        }
        scan();
      });
      scan();
      mutations.observe(root, { childList: true, subtree: true });
      root.addEventListener('animationend', finish);
      root.addEventListener('animationcancel', finish);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        mutations.disconnect();
        root.removeEventListener('animationend', finish);
        root.removeEventListener('animationcancel', finish);
      });
    }));
  }
}
