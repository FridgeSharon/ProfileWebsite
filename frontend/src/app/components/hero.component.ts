import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../data/portfolio-content';

@Component({
  selector: 'app-hero', standalone: true, imports: [RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="section-shell">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow"><span class="dot" aria-hidden="true"></span>{{ hero.eyebrow }}</p>
            <h1 id="hero-title">{{ profile.headline }}<br><span>{{ profile.headlineAccent }}</span></h1>
            <p class="summary">{{ profile.summary }}</p>
            <div class="actions">
              <a class="button primary" data-cursor-light="filled" routerLink="/" fragment="work">{{ hero.workLink }} <span aria-hidden="true">↓</span></a>
              <a class="text-link" routerLink="/cv">{{ site.cv }} <span aria-hidden="true">↗</span></a>
            </div>
            <p class="availability"><span aria-hidden="true">✳</span> {{ profile.availability }}</p>
          </div>
          <figure class="system-map" data-cursor-light="map" [attr.aria-label]="hero.diagramLabel">
            <div class="map-top"><span>{{ hero.diagramLabel }}</span><span aria-hidden="true">↗</span></div>
            <ol>
              @for (node of hero.diagramNodes; track node.label; let index = $index) {
                <li [class.center-node]="index === 1">
                  <span class="node-number" aria-hidden="true">0{{ index + 1 }}</span>
                  <div><span class="node-label">{{ node.label }}</span><strong>{{ node.value }}</strong><small>{{ node.detail }}</small></div>
                  <span class="node-icon" aria-hidden="true">{{ index === 0 ? '↗' : index === 1 ? '⌘' : '↥' }}</span>
                </li>
              }
            </ol>
            <figcaption><span class="map-dot" aria-hidden="true"></span>{{ hero.diagramCaption }}</figcaption>
          </figure>
        </div>
        <dl class="facts">
          @for (fact of hero.facts; track fact.label) { <div><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div> }
        </dl>
      </div>
    </section>
  `,
  styles: [`
    .hero { padding: clamp(4rem, 7.2vw, 7rem) 2.25rem 0; }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, .8fr); gap: clamp(2rem, 5vw, 5rem); align-items: center; }
    .hero-copy > .eyebrow { display: flex; align-items: center; gap: .7rem; margin-bottom: 1.8rem; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
    h1 { font-size: clamp(3.6rem, 6.3vw, 5.9rem); line-height: 1.01; letter-spacing: -.065em; font-weight: 600; }
    h1 span { color: var(--accent); }
    .summary { max-width: 550px; margin-top: 1.75rem; color: var(--text-muted); font-size: 1.12rem; line-height: 1.8; }
    .actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.75rem; margin-top: 1.9rem; }
    .availability { margin-top: 2rem; color: var(--text-soft); font-size: .76rem; }
    .availability span { color: var(--accent); font-size: 1rem; margin-right: .3rem; }
    .system-map { position: relative; padding: 1.7rem; color: #f4f7eb; background: #183b2f; border-radius: 12px; overflow: hidden; }
    .system-map::before { content: ''; position: absolute; inset: 0; background: radial-gradient(#cde4bb30 1px, transparent 1px); background-size: 20px 20px; opacity: .5; pointer-events: none; }
    .map-top { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: #c1d5c8; font: 400 .6rem/1.5 var(--font-mono); letter-spacing: .04em; text-transform: uppercase; }
    .map-top > span:last-child { font-size: 1.3rem; }
    ol { position: relative; display: grid; gap: 1.6rem; list-style: none; padding: 0; margin: 2.5rem 0; }
    li { position: relative; display: flex; align-items: center; gap: .8rem; border: 1px solid #789b843d; border-radius: 6px; padding: 1rem; background: #214536; }
    li:not(:last-child)::after { content: ''; position: absolute; width: 1px; height: 1.65rem; background: #8fae89; top: 100%; left: 50%; }
    li.center-node { background: var(--lime); color: #203927; border-color: var(--lime); transform: translateX(-.45rem); box-shadow: .45rem .45rem 0 #0f2c22; }
    .node-number { align-self: start; padding-top: 3px; color: #a8c8ae; font: .6rem/1.5 var(--font-mono); }
    .center-node .node-number { color: #4c6341; }
    .node-label { display: block; margin-bottom: .2rem; font: .58rem/1.5 var(--font-mono); text-transform: uppercase; letter-spacing: .07em; opacity: .8; }
    strong { display: block; font-size: 1.03rem; font-weight: 600; }
    small { display: block; margin-top: .2rem; font: .62rem/1.5 var(--font-mono); color: #baceba; }
    .center-node small { color: #4a6140; }
    .node-icon { margin-left: auto; font-size: 1.4rem; font-family: var(--font-mono); }
    figcaption { position: relative; display: flex; align-items: center; gap: .5rem; color: #c1d5c8; font-size: .7rem; }
    .map-dot { width: 5px; height: 5px; background: var(--lime); border-radius: 50%; flex-shrink: 0; }
    .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: clamp(3rem, 6vw, 5.5rem); padding: 1.8rem 0; border-block: 1px solid var(--border); }
    .facts div { display: flex; flex-direction: column-reverse; gap: .2rem; }
    .facts div + div { border-left: 1px solid var(--border); padding-left: 2rem; }
    dt { color: var(--text-soft); font-size: .74rem; } dd { font-size: 1.2rem; font-weight: 600; letter-spacing: -.02em; }
    @media (max-width: 980px) { .hero-grid { grid-template-columns: minmax(0, 1.2fr) minmax(0, .9fr); gap: 2rem; } h1 { font-size: clamp(3.3rem, 6vw, 5rem); } .system-map { padding: 1.2rem; } .node-icon { display: none; } }
    @media (max-width: 760px) { .hero { padding: 3.5rem 1.25rem 0; } .hero-grid { grid-template-columns: 1fr; gap: 2.75rem; } h1 { font-size: clamp(3.1rem, 9vw, 4.8rem); } .hero-copy { max-width: 610px; } .summary { font-size: 1rem; } .system-map { max-width: 540px; width: 100%; padding: 1.5rem; } ol { margin: 1.5rem 0; gap: 1rem; } li:not(:last-child)::after { height: 1.05rem; } .node-icon { display: block; } .facts { gap: 1rem; } .facts div + div { padding-left: 1rem; } dd { font-size: .95rem; } dt { font-size: .65rem; } }
    @media (max-width: 380px) { .facts { grid-template-columns: 1fr; gap: .9rem; } .facts div { flex-direction: row-reverse; justify-content: space-between; gap: 1rem; align-items: baseline; } .facts div + div { border: 0; padding: 0; } .actions { gap: 1rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly profile = portfolioContent.profile;
  protected readonly hero = portfolioContent.hero;
  protected readonly site = portfolioContent.site;
}
