import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioContent } from '../src/app/data/portfolio-content.ts';

const here = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(here, '..');
const includeDist = process.argv.includes('--dist');

assert.equal(portfolioContent.profile.name, 'Guy Sharon');
assert.ok(portfolioContent.profile.summary.includes('Node.js'));
assert.ok(portfolioContent.experience.length >= 3);
assert.ok(portfolioContent.caseStudies.length >= 2);
assert.ok(portfolioContent.skillGroups.length >= 5);
assert.ok(portfolioContent.education.length >= 2);
assert.ok(portfolioContent.languages.length >= 2);
assert.match(portfolioContent.profile.cvSummary, /nearly 6 years/);
assert.doesNotMatch(portfolioContent.profile.cvSummary, /6\+ years/);
assert.ok(portfolioContent.skillGroups.some((group) => group.skills.includes('React — basic')));
assert.ok(portfolioContent.caseStudies.find((study) => study.id === 'game').note.includes('still pending'));
assert.equal(portfolioContent.caseStudies.find((study) => study.id === 'expenses').url, undefined);

async function listFiles(path) {
  const entries = await readdir(path);
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = join(path, entry);
    return (await stat(absolute)).isDirectory() ? listFiles(absolute) : [absolute];
  }));
  return nested.flat();
}

const roots = [join(frontendRoot, 'src')];
if (includeDist) roots.push(join(frontendRoot, 'dist', 'frontend', 'browser'));

const disallowed = [
  { name: 'email address', pattern: /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/ },
  { name: 'Israeli mobile number', pattern: /(?:\+972[-\s]?|0)5\d(?:[-\s]?\d){7}/ },
  { name: 'Render hostname', pattern: /onrender\.com/i },
  { name: 'runtime API path', pattern: /\/api\// },
  { name: 'visitor identifier', pattern: /profile_visitor_id/i },
  { name: 'EventSource analytics stream', pattern: /EventSource/ },
  { name: 'backend build variable', pattern: /BACKEND_URL/ },
];

for (const root of roots) {
  for (const file of await listFiles(root)) {
    assert.doesNotMatch(file, /\.pdf$/i, `Source PDF must not be published: ${file}`);
    if (!/\.(?:html|js|mjs|ts|json|xml|txt|css|scss)$/.test(file)) continue;
    const value = await readFile(file, 'utf8');
    for (const rule of disallowed) {
      assert.equal(rule.pattern.test(value), false, `${rule.name} found in ${file}`);
    }
  }
}

if (includeDist) {
  const themeInitializer = await readFile(join(frontendRoot, 'dist', 'frontend', 'browser', 'theme-init.js'), 'utf8');
  assert.ok(themeInitializer.trim().length > 0, 'Missing appearance initializer');
  for (const route of ['index.html', 'cv/index.html', 'architecture/index.html']) {
    const html = await readFile(join(frontendRoot, 'dist', 'frontend', 'browser', route), 'utf8');
    assert.match(html, /Guy Sharon/);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<link rel="canonical"/);
    const path = route === 'index.html' ? '/' : `/${route.split('/')[0]}`;
    const escapeHtml = (value) => value.replaceAll('&', '&amp;');
    assert.ok(html.includes(`<title>${escapeHtml(portfolioContent.site.metadata[path].title)}</title>`), `Wrong title: ${path}`);
    assert.ok(html.includes(`href="${portfolioContent.site.url}${path === '/' ? '' : path}"`), `Wrong canonical: ${path}`);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `Expected one h1: ${path}`);
    assert.equal((html.match(/id="profile-schema"/g) ?? []).length, 1, `Expected one structured profile: ${path}`);
    assert.doesNotMatch(html, /\son[a-z]+\s*=/i, `Inline event handler conflicts with the production CSP: ${path}`);
    assert.match(html, /<html[^>]*data-theme="light"/, `Default light theme did not prerender: ${path}`);
    assert.match(html, /<html[^>]*data-motion="full"/, `Motion preference did not prerender: ${path}`);
    const initializerPosition = html.indexOf('<script src="theme-init.js"');
    const stylesheetPosition = html.indexOf('<link rel="stylesheet"');
    assert.ok(initializerPosition >= 0 && initializerPosition < stylesheetPosition, `Saved appearance must apply before styles: ${path}`);
    if (path === '/') {
      for (const study of portfolioContent.caseStudies) assert.ok(html.includes(study.title), `Missing project: ${study.title}`);
    }
    if (path === '/cv') {
      assert.match(html, /nearly 6 years/);
      for (const entry of portfolioContent.experience) assert.ok(html.includes(entry.company));
    }
  }
}

console.log(`Static portfolio verification passed${includeDist ? ' (including prerendered output)' : ''}.`);
