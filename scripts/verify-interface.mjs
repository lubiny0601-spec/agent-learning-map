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
  'card-action'
]) {
  if (!html.includes(marker)) throw new Error(`Missing entry marker: ${marker}`);
}
