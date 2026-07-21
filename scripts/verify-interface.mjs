import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('prototype/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const courseCards = [...html.matchAll(/<article class="card[^"]*"[^>]*data-key="([^"]+)"/g)];
if (courseCards.length < 25) {
  throw new Error(`Expected at least 25 course cards, found ${courseCards.length}`);
}

const uniqueKeys = new Set(courseCards.map((match) => match[1]));
for (const key of uniqueKeys) {
  if (!html.includes(`"${key}": {`)) throw new Error(`Card has no compiled content: ${key}`);
}

const backgroundPath = path.resolve('prototype/assets/spring-learning-meadow.png');
if (!fs.existsSync(backgroundPath) || fs.statSync(backgroundPath).size < 50_000) {
  throw new Error('Missing or undersized spring background asset');
}

for (const marker of ['spring-learning-meadow.png', '--meadow-deep:', '--paper-warm:']) {
  if (!html.includes(marker)) throw new Error(`Missing background marker: ${marker}`);
}

for (const marker of [
  "primaryLink.className = 'card-primary-link'",
  "entry.className = 'course-entry'",
  'function initLearningEntries()',
  'entryLabelByKey',
  'card-action',
  '.uiux-reference { pointer-events: auto; z-index: 3; }',
  'initLearningEntries();',
  '.card:focus-within { border-color: var(--meadow-deep); box-shadow: 0 0 0 3px rgba(23, 63, 42, .45), 0 14px 40px rgba(23, 63, 42, .12); }'
]) {
  if (!html.includes(marker)) throw new Error(`Missing entry marker: ${marker}`);
}

const courseEntryRule = html.match(/\.course-entry\s*\{([\s\S]*?)\n    \}/);
if (!courseEntryRule?.[1].includes('min-height: 44px;')) {
  throw new Error('Course entry no longer has a 44px minimum target');
}

for (const marker of [
  "--font: 'Instrument Sans', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC'",
  'font-synthesis: none',
  'line-height: 1.72',
  'font-size: clamp(2.35rem, 5.6vw, 4.4rem)',
  'font-size: clamp(1.8rem, 3.8vw, 3.2rem)',
  'line-height: 1.85',
  'font-size: clamp(2.2rem, 11vw, 3.15rem)'
]) {
  if (!html.includes(marker)) throw new Error(`Missing typography marker: ${marker}`);
}
