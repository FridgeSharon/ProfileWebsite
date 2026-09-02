import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioContent } from '../src/app/data/portfolio-content.ts';

const here = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(here, '..');
const includeDist = process.argv.includes('--dist');

assert.equal(portfolioContent.profile.name, 'Guy Sharon');
assert.ok(portfolioContent.profile.headline.includes('Node.js'));
assert.ok(portfolioContent.experience.length >= 3);
assert.ok(portfolioContent.caseStudies.length >= 2);
assert.ok(portfolioContent.skillGroups.length >= 5);
assert.ok(portfolioContent.education.length >= 2);
assert.ok(portfolioContent.languages.length >= 2);

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
  { name: 'Israeli mobile number', pattern: /(?:\+972|0)5\d[-\s]?\d{7}/ },
  { name: 'Render hostname', pattern: /onrender\.com/i },
  { name: 'runtime API path', pattern: /\/api\// },
  { name: 'visitor identifier', pattern: /profile_visitor_id/i },
  { name: 'EventSource analytics stream', pattern: /EventSource/ },
  { name: 'backend build variable', pattern: /BACKEND_URL/ },
];

for (const root of roots) {
  for (const file of await listFiles(root)) {
    if (!/\.(?:html|js|mjs|ts|json|xml|txt|css|scss)$/.test(file)) continue;
    const value = await readFile(file, 'utf8');
    for (const rule of disallowed) {
      assert.equal(rule.pattern.test(value), false, `${rule.name} found in ${file}`);
    }
  }
}

if (includeDist) {
  for (const route of ['index.html', 'cv/index.html', 'architecture/index.html']) {
    const html = await readFile(join(frontendRoot, 'dist', 'frontend', 'browser', route), 'utf8');
    assert.match(html, /Guy Sharon/);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<link rel="canonical"/);
  }
}

console.log(`Static portfolio verification passed${includeDist ? ' (including prerendered output)' : ''}.`);
