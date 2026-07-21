# Spring Atmosphere and Clickable Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an original misty spring-meadow atmosphere to the learning map and turn every course card label into a clear, accessible entry to its existing lesson.

**Architecture:** Keep the static single-page architecture and compiled `content` object unchanged. Add one local background asset, append a focused visual override in `prototype/index.html`, and initialize semantic full-card links plus independent course-label buttons from each card's existing `data-key`. Add a dependency-free verification script that checks the asset, interaction markers, card coverage, and responsive/reduced-motion safeguards.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js verification scripts, local raster asset generated with the image generation tool.

## Global Constraints

- Preserve all current learning content, section order, search, reader, progress, mobile navigation, and build behavior.
- Do not copy the reference image, its text, logo, people, or proprietary composition.
- Do not add a framework, server, third-party runtime dependency, or a new content data model.
- Use one local wide background asset with a CSS color/gradient fallback.
- All course entries must support mouse, touch, and keyboard access.
- Keep interactive hit targets at least 44px high and stop motion under `prefers-reduced-motion: reduce`.

---

### Task 1: Add a General Interface Verification Gate

**Files:**
- Create: `scripts/verify-interface.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `prototype/index.html`, `prototype/assets/spring-learning-meadow.png`
- Produces: `npm run verify:interface`, a zero-dependency static verification command

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-interface.mjs` with these exact baseline checks:

```js
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
```

- [ ] **Step 2: Register the command**

Add this script to `package.json` without changing the existing scripts:

```json
"verify:interface": "node scripts/verify-interface.mjs"
```

- [ ] **Step 3: Run the command and confirm the green baseline**

Run: `npm.cmd run verify:interface`

Expected: PASS with exit code 0.

- [ ] **Step 4: Commit the independent verification gate**

```powershell
git add package.json scripts/verify-interface.mjs
git commit -m "test: add interface verification gate"
```

---

### Task 2: Create the Original Spring-Meadow Background and Surface System

**Files:**
- Create: `prototype/assets/spring-learning-meadow.png`
- Modify: `prototype/index.html`
- Test: `scripts/verify-interface.mjs`

**Interfaces:**
- Consumes: existing CSS variables and `#heroCollage`
- Produces: `--meadow-deep`, `--paper-warm`, local background URL, mobile and reduced-motion fallbacks

- [ ] **Step 1: Extend the verifier with background assertions**

Append this check to `scripts/verify-interface.mjs`:

```js
const backgroundPath = path.resolve('prototype/assets/spring-learning-meadow.png');
if (!fs.existsSync(backgroundPath) || fs.statSync(backgroundPath).size < 50_000) {
  throw new Error('Missing or undersized spring background asset');
}

for (const marker of ['spring-learning-meadow.png', '--meadow-deep:', '--paper-warm:']) {
  if (!html.includes(marker)) throw new Error(`Missing background marker: ${marker}`);
}
```

- [ ] **Step 2: Run the extended verifier and confirm the expected red state**

Run: `npm.cmd run verify:interface`

Expected: FAIL with `Missing or undersized spring background asset`.

- [ ] **Step 3: Generate the original background asset**

Use the image generation skill and save the result as `prototype/assets/spring-learning-meadow.png`. Use this prompt:

```text
Create an original wide 16:9 atmospheric background for an educational web interface. A dreamy spring meadow painted with a mix of soft photography and impressionist brush texture: deep forest-green grass in the lower third, misty sage and pale green atmosphere above, a few soft lavender and ivory flower bokeh shapes, gentle diffused daylight, subtle paper grain, calm and sophisticated. Keep the central and left-middle areas low-detail so interface text remains readable. No people, no buildings, no text, no letters, no logos, no event poster layout, and do not reproduce any existing image or identifiable composition. High resolution, landscape orientation.
```

- [ ] **Step 4: Add the background and surface CSS override**

Append the following focused tokens and rules to the final visual-system `<style>` block in `prototype/index.html`, adjusting only existing selectors named here:

```css
:root {
  --meadow-deep: #173f2a;
  --meadow-mid: #55785d;
  --meadow-mist: #dfe8d9;
  --paper-warm: #fbfaf3;
  --paper-soft: #f3f4ea;
  --flower-lilac: #c8a7dc;
}

body {
  background-color: var(--meadow-mist);
  background-image:
    linear-gradient(180deg, rgba(20, 55, 36, .18), rgba(223, 232, 217, .74) 48%, rgba(244, 243, 232, .94)),
    url('./assets/spring-learning-meadow.png');
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}

.topbar {
  background: var(--paper-warm);
  border-bottom-color: rgba(23, 63, 42, .18);
}

.collage-hero {
  min-height: 680px;
  margin-bottom: 96px;
  background:
    linear-gradient(90deg, rgba(12, 43, 27, .2), rgba(12, 43, 27, .02)),
    url('./assets/spring-learning-meadow.png') center / cover;
  border-radius: 24px;
  overflow: hidden;
}

.collage-hero .hero-main,
.collage-hero .hero-side,
.section,
.reader {
  background: var(--paper-warm);
  border-color: rgba(23, 63, 42, .16);
}

.figma-surface {
  background: var(--paper-warm);
  border: 1px solid rgba(23, 63, 42, .14);
}

.figma-surface .section-head::before {
  content: '';
  display: block;
  width: 64px;
  height: 8px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: var(--section-accent, var(--meadow-mid));
}

.surface-lime { --section-accent: #8cac63; }
.surface-lilac { --section-accent: var(--flower-lilac); }
.surface-cream { --section-accent: #d8bd79; }
.surface-mint { --section-accent: #73a886; }
.surface-coral { --section-accent: #d89479; }
.surface-navy { --section-accent: #75689f; color: var(--ink); }
.surface-navy h2,
.surface-navy h3,
.surface-navy p,
.surface-navy .kind,
.surface-navy .card-foot { color: var(--ink); }
.surface-navy .card { background: var(--paper-soft); border-color: rgba(23, 63, 42, .16); }

@media (max-width: 768px) {
  body { background-attachment: scroll; }
  .collage-hero { min-height: 620px; border-radius: 0; }
}

@media (prefers-reduced-motion: reduce) {
  body { background-attachment: scroll; }
}
```

- [ ] **Step 5: Check asset and visual markers**

Run: `npm.cmd run verify:interface`

Expected: PASS with exit code 0.

- [ ] **Step 6: Commit the background slice**

```powershell
git add prototype/assets/spring-learning-meadow.png prototype/index.html scripts/verify-interface.mjs
git commit -m "feat: add spring meadow interface atmosphere"
```

---

### Task 3: Turn Every Course Label into an Independent Entry

**Files:**
- Modify: `prototype/index.html`
- Test: `scripts/verify-interface.mjs`

**Interfaces:**
- Consumes: `.card[data-key]`, each card's `h3`, `.kind`, `.card-foot`, and existing `openReader(key)`
- Produces: `entryLabelByKey`, `initLearningEntries()`, `.card-primary-link`, `.course-entry`, `.card-action`

- [ ] **Step 1: Extend the verifier with course-entry assertions**

Append this check to `scripts/verify-interface.mjs`:

```js
for (const marker of [
  "primaryLink.className = 'card-primary-link'",
  "entry.className = 'course-entry'",
  'function initLearningEntries()',
  'entryLabelByKey',
  'card-action'
]) {
  if (!html.includes(marker)) throw new Error(`Missing entry marker: ${marker}`);
}
```

- [ ] **Step 2: Run the extended verifier and confirm the expected red state**

Run: `npm.cmd run verify:interface`

Expected: FAIL with `Missing entry marker: primaryLink.className = 'card-primary-link'`.

- [ ] **Step 3: Add stable short labels for all unique lesson keys**

Add this object before `openReader`:

```js
const entryLabelByKey = {
  ai_beginner_101: 'AI 基础',
  gemini_sop: 'Gemini SOP',
  notebooklm_sop: 'NotebookLM',
  ai_poster: 'AI 海报',
  ai_ppt: 'AI PPT',
  ai_video: 'AI 视频',
  ai_dashboard: 'AI 看板',
  ai_research: 'AI 文献检索',
  ai_market_analysis: 'AI 市场分析',
  cursor: 'Cursor',
  github: 'GitHub',
  repo: '项目解读',
  sop_writer: 'SOP 撰写',
  tool_research: 'AI 工具研究',
  github_project_reader: 'GitHub 项目阅读',
  prompt_optimizer: 'Prompt 调优',
  claude_code: 'Claude Code',
  trae: 'Trae',
  codex: 'Codex',
  workbuddy: 'Workbuddy',
  mcp_helper: 'MCP 配置',
  error_troubleshooter: '排错 Skill',
  risk_safety_review: '安全审查',
  prompt_template_skill: 'Prompt 模板',
  ai_prd_guide: 'AI PRD',
  prd_to_ui: 'PRD → UI',
  call_insight_stitch: 'Call Insight',
  uiux_tools_map: 'UI/UX 工具地图',
  static_hosting_guide: '静态部署',
  wechat_sharing_guide: '微信分享'
};
```

- [ ] **Step 4: Add semantic card and label initialization**

Add this function after `handleCardKey`:

```js
function initLearningEntries() {
  document.querySelectorAll('.card[data-key]').forEach((card) => {
    if (card.dataset.entryReady === 'true') return;

    const key = card.dataset.key;
    if (!content[key]) return;

    const title = card.querySelector('h3')?.textContent.trim() || entryLabelByKey[key] || key;
    const label = entryLabelByKey[key] || title;
    card.dataset.entryReady = 'true';
    card.removeAttribute('onclick');
    card.removeAttribute('onkeydown');
    card.removeAttribute('role');
    card.removeAttribute('tabindex');
    card.removeAttribute('aria-label');

    const primaryLink = document.createElement('a');
    primaryLink.className = 'card-primary-link';
    primaryLink.href = '#reader';
    primaryLink.setAttribute('aria-label', `开始学习：${title}`);
    primaryLink.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openReader(key);
    });
    card.prepend(primaryLink);

    const kind = card.querySelector('.kind');
    if (kind) {
      const metaText = kind.textContent.trim();
      kind.textContent = '';

      const entry = document.createElement('button');
      entry.type = 'button';
      entry.className = 'course-entry';
      entry.textContent = label;
      entry.setAttribute('aria-label', `打开课程：${title}`);
      entry.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openReader(key);
      });

      const meta = document.createElement('span');
      meta.className = 'kind-meta';
      meta.textContent = metaText;
      kind.append(entry, meta);
    }

    const footer = card.querySelector('.card-foot');
    if (footer && !footer.querySelector('.card-action')) {
      const action = document.createElement('span');
      action.className = 'card-action';
      action.textContent = '开始学习';
      const arrow = footer.querySelector('.arrow');
      footer.insertBefore(action, arrow || null);
    }
  });
}
```

- [ ] **Step 5: Initialize entries on page load**

Call `initLearningEntries();` at the start of the existing `DOMContentLoaded` callback, before progress updates.

- [ ] **Step 6: Add interaction styles**

Add these rules to the final visual-system style block:

```css
.card { position: relative; isolation: isolate; }
.card > :not(.card-primary-link) { position: relative; z-index: 2; pointer-events: none; }
.card-primary-link { position: absolute; inset: 0; z-index: 1; border-radius: inherit; }
.card-primary-link:focus-visible { outline: 3px solid var(--meadow-deep); outline-offset: 4px; }
.kind { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.course-entry {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--meadow-deep);
  border-radius: 999px;
  background: var(--paper-warm);
  color: var(--meadow-deep);
  font: 700 .82rem var(--font);
  cursor: pointer;
  pointer-events: auto;
}
.course-entry:hover,
.course-entry:focus-visible { background: var(--meadow-deep); color: #fff; outline: none; }
.course-entry:active { transform: scale(.97); }
.kind-meta { color: var(--ink); font: 500 .72rem var(--mono); }
.card-action { margin-left: auto; font-weight: 700; }
.card:hover { border-color: var(--meadow-deep); box-shadow: 0 14px 40px rgba(23, 63, 42, .12); }
```

- [ ] **Step 7: Run the interface verification gate**

Run: `npm.cmd run verify:interface`

Expected: PASS with exit code 0.

- [ ] **Step 8: Commit the complete red-green slice**

```powershell
git add package.json scripts/verify-interface.mjs prototype/index.html prototype/assets/spring-learning-meadow.png
git commit -m "feat: add spring atmosphere and clickable course entries"
```

---

### Task 4: Regression Verification and Handoff

**Files:**
- Verify: `prototype/index.html`
- Verify: `scripts/verify-uiux.mjs`
- Verify: `scripts/verify-interface.mjs`

**Interfaces:**
- Consumes: the complete static learning map
- Produces: verified build and clean Git state

- [ ] **Step 1: Recompile Markdown content**

Run: `npm.cmd run build`

Expected: `Build completed successfully! Content synchronized in prototype/index.html`.

- [ ] **Step 2: Run both verification suites**

Run: `npm.cmd run verify:uiux; npm.cmd run verify:interface`

Expected: both commands exit 0 with no thrown errors.

- [ ] **Step 3: Check generated HTML integrity and whitespace**

Run: `git diff --check; git status --short`

Expected: no whitespace errors; only intentional files are modified or the worktree is clean after commit.

- [ ] **Step 4: Inspect required interaction coverage**

Run:

```powershell
rg -n 'spring-learning-meadow|initLearningEntries|card-primary-link|course-entry|card-action|prefers-reduced-motion' prototype/index.html
```

Expected: every marker appears in the final page source.

- [ ] **Step 5: Push only if already authorized**

If the user has explicitly authorized pushing this revision, run:

```powershell
git push origin main
```

Expected: `main -> main`, followed by `git rev-list --left-right --count origin/main...HEAD` returning `0 0`.
