import fs from 'node:fs';
import path from 'node:path';

const required = [
  'content/uiux/prd-to-ui-guide.md',
  'content/uiux/call-insight-stitch-workshop.md',
  'content/uiux/uiux-tools-map.md',
  'content/uiux/call-insight-stitch-brief.md',
  'prototype/uiux/prd-to-ui-workshop.html',
  'prototype/uiux/uiux-tools-map.html',
  'prototype/uiux/call-insight-low-fi-wireframe.png'
];

for (const file of required) {
  if (!fs.existsSync(path.resolve(file))) {
    throw new Error(`Missing UI/UX resource: ${file}`);
  }
}
