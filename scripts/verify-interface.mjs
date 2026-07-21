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
