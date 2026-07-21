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

const prototype = fs.readFileSync(path.resolve('prototype/index.html'), 'utf8');
for (const key of ['prd_to_ui', 'call_insight_stitch', 'uiux_tools_map', 'call_insight_stitch_brief']) {
  if (!prototype.includes(`"${key}": {`)) {
    throw new Error(`Missing compiled content key: ${key}`);
  }
}

for (const marker of ['id="heroCollage"', 'data-parallax="far"', 'data-parallax="mid"', 'data-parallax="near"', 'prefers-reduced-motion: reduce']) {
  if (!prototype.includes(marker)) {
    throw new Error(`Missing parallax marker: ${marker}`);
  }
}

for (const marker of [
  'href="#uiux"',
  'id="uiux"',
  'data-key="prd_to_ui"',
  'data-key="call_insight_stitch"',
  'data-key="uiux_tools_map"',
  'uiux/call-insight-low-fi-wireframe.png'
]) {
  if (!prototype.includes(marker)) {
    throw new Error(`Missing UI/UX chapter marker: ${marker}`);
  }
}

for (const marker of [
  '--canvas: #ffffff',
  '--ink: #000000',
  '--block-lime: #dceeb1',
  '--block-lilac: #c5b0f4',
  '--block-navy: #1f1d3d',
  'figma-surface',
  'navToggle',
  'aria-expanded',
  'class="section figma-surface surface-lime"',
  'class="section figma-surface surface-cream"',
  'class="section figma-surface surface-navy"',
  'class="section figma-surface surface-mint"',
  'class="section figma-surface surface-coral"',
  'class="section uiux-section figma-surface surface-lilac"',
  'id="primaryNav"'
]) {
  if (!prototype.includes(marker)) {
    throw new Error(`Missing visual-system marker: ${marker}`);
  }
}
