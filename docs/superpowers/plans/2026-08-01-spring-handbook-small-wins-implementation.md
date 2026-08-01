# Spring Handbook Small Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Turn the learning map into a coherent spring-handbook experience whose homepage starts with one existing course that can produce a small result today.

**Architecture:** Retain the static single-page model. Add a semantic mission card and small helpers that reuse the existing content object, reader function, progress function, and local completion data. Replace the final conflicting style override with one token-driven spring-handbook layer, then protect its contract using the existing Node verifier.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js verification scripts.

## Global Constraints

- Preserve all existing course content, course-key mapping, search, reader, navigation, completedKeys storage key, and build pipeline.
- Add no dependency, framework, external request, copied brand text, or third-party visual asset.
- Keep the existing Chinese font fallback and reading-first type scale.
- Keep interactive touch areas at least 44px, focus visible, and reduced-motion static.
- Use explicit transitions only; never use transition-all.
- Keep all visual changes in the final visual enhancement block of prototype/index.html.

---

### Task 1: Build today’s small win and synchronise its completion state

**Files:**
- Modify: prototype/index.html (hero markup and script functions)
- Modify: scripts/verify-interface.mjs

**Interfaces:**
- Consumes: content, completedKeys, updateProgress(), openReader(key).
- Produces: TODAY_MISSION, updateTodayMission(), startTodayMission(), and #todayMission.

- [ ] **Step 1: Write the failing interface assertion**

Append this to scripts/verify-interface.mjs:

~~~js
for (const marker of [
  'id="todayMission"',
  'const TODAY_MISSION = {',
  "key: 'ai_poster'",
  'function updateTodayMission()',
  'function startTodayMission()',
  'updateTodayMission();'
]) {
  if (!html.includes(marker)) throw new Error('Missing today mission marker: ' + marker);
}
~~~

- [ ] **Step 2: Prove the assertion fails**

Run: npm.cmd run verify:interface

Expected: FAIL with Missing today mission marker.

- [ ] **Step 3: Insert semantic mission markup at the beginning of .hero-side**

~~~html
<section class="today-mission" id="todayMission" aria-labelledby="todayMissionTitle" data-key="ai_poster">
  <div class="mission-kicker">TODAY'S SMALL WIN</div>
  <p class="mission-time">预计 10 分钟 · 已有教程</p>
  <h2 id="todayMissionTitle">完成一张 AI 海报</h2>
  <ol class="mission-steps">
    <li><span>1</span>打开教程，确定海报主题</li>
    <li><span>2</span>跟做一个生成与排版步骤</li>
    <li><span>3</span>保存你的第一版成果</li>
  </ol>
  <button class="mission-start" id="todayMissionStart" type="button" onclick="startTodayMission()">开始 10 分钟任务 <span aria-hidden="true">→</span></button>
  <p class="mission-status" id="todayMissionStatus" role="status" aria-live="polite"></p>
</section>
~~~

Keep the existing progress tracker immediately after this module.

- [ ] **Step 4: Add the mission helpers and connect them to updateProgress**

Add directly after the completedKeys declaration:

~~~js
const TODAY_MISSION = {
  key: 'ai_poster',
  completedText: '今天的小成果已完成，继续挑选下一项吧。',
  pendingText: '从一个小成果开始，学习会更容易坚持。'
};

function updateTodayMission() {
  const mission = document.getElementById('todayMission');
  const status = document.getElementById('todayMissionStatus');
  const start = document.getElementById('todayMissionStart');
  if (!mission || !status || !start) return;
  const completed = completedKeys.includes(TODAY_MISSION.key);
  mission.classList.toggle('is-complete', completed);
  status.textContent = completed ? TODAY_MISSION.completedText : TODAY_MISSION.pendingText;
  start.textContent = completed ? '查看已完成教程 ↗' : '开始 10 分钟任务 →';
}

function startTodayMission() {
  openReader(TODAY_MISSION.key);
}
~~~

At the end of updateProgress(), after the card-state loop, add updateTodayMission();.

- [ ] **Step 5: Run green checks and commit**

Run: npm.cmd run build && npm.cmd run verify:interface && npm.cmd run verify:uiux && git diff --check

Expected: every command succeeds.

~~~bash
git add prototype/index.html scripts/verify-interface.mjs
git commit -m "feat: add today small win mission"
~~~

### Task 2: Consolidate the visual layer into a spring-handbook system

**Files:**
- Modify: prototype/index.html (the final visual system block)
- Modify: scripts/verify-interface.mjs

**Interfaces:**
- Consumes: #todayMission, existing sections, cards, entries, reader, and navigation.
- Produces: handbook tokens plus common visual, responsive, focus, and motion states.

- [ ] **Step 1: Write the failing visual assertions**

Append this loop to scripts/verify-interface.mjs:

~~~js
for (const marker of [
  '--handbook-paper:',
  '--handbook-moss:',
  '.today-mission {',
  '.mission-start {',
  'text-wrap: balance',
  'text-wrap: pretty',
  'transition-property: transform, background-color, border-color, box-shadow, color',
  'transform: scale(.96)',
  '@media (prefers-reduced-motion: reduce)'
]) {
  if (!html.includes(marker)) throw new Error('Missing handbook visual marker: ' + marker);
}
~~~

Run: npm.cmd run verify:interface

Expected: FAIL with Missing handbook visual marker.

- [ ] **Step 2: Replace the final conflicting spring override with these shared tokens and foundation**

~~~css
:root {
  --handbook-paper: #fffdf6;
  --handbook-paper-soft: #f5f2e7;
  --handbook-ink: #183728;
  --handbook-moss: #315f3e;
  --handbook-leaf: #94b477;
  --handbook-lilac: #c8b0d8;
  --handbook-line: rgba(24, 55, 40, .16);
  --handbook-shadow: 0 18px 44px rgba(24, 55, 40, .12);
}
body {
  background-color: #e4ecd9;
  background-image: linear-gradient(180deg, rgba(20,55,36,.16), rgba(240,243,226,.84) 48%, rgba(248,246,236,.96)), url('./assets/spring-learning-meadow.png');
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  color: var(--handbook-ink);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { text-wrap: balance; }
p, li { text-wrap: pretty; }
.topbar, .section, .reader, .collage-hero .hero-main, .collage-hero .hero-side { background: var(--handbook-paper); border-color: var(--handbook-line); }
.section { border-radius: 24px; box-shadow: 0 12px 28px rgba(24,55,40,.06); }
.card {
  border-color: var(--handbook-line);
  border-radius: 16px;
  background: var(--handbook-paper-soft);
  box-shadow: 0 5px 0 rgba(24,55,40,.04);
  transition-property: transform, background-color, border-color, box-shadow, color;
  transition-duration: 180ms;
  transition-timing-function: ease-out;
}
.card:hover { transform: translateY(-3px); border-color: var(--handbook-moss); background: var(--handbook-paper); box-shadow: var(--handbook-shadow); }
.card:focus-within { border-color: var(--handbook-moss); box-shadow: 0 0 0 3px rgba(49,95,62,.3), var(--handbook-shadow); }
~~~

Remove any duplicate body, section, card, or surface-navy rules below this block so the new system is the last active authority.

- [ ] **Step 3: Add mission, control, and motion rules**

~~~css
.today-mission {
  position: relative; overflow: hidden; padding: 24px;
  border: 1px solid var(--handbook-line); border-radius: 20px;
  background: linear-gradient(145deg, #fffdf6, #e8efcf);
  box-shadow: 8px 10px 0 rgba(49,95,62,.1);
}
.today-mission::after { content: '✦'; position: absolute; right: 18px; top: 16px; color: var(--handbook-lilac); font-size: 28px; opacity: .85; }
.mission-kicker, .mission-time { font: 700 .72rem/1.4 var(--mono); letter-spacing: .1em; color: var(--handbook-moss); }
.mission-time { margin: 8px 0 14px; letter-spacing: .04em; }
.today-mission h2 { max-width: 12ch; margin: 0; font-size: clamp(1.55rem, 2.2vw, 2rem); }
.mission-steps { display: grid; gap: 10px; margin: 18px 0; padding: 0; list-style: none; }
.mission-steps li { display: flex; align-items: center; gap: 10px; font-size: .9rem; }
.mission-steps span { display: grid; width: 24px; height: 24px; place-items: center; border-radius: 50%; background: var(--handbook-leaf); font: 700 .72rem/1 var(--mono); }
.mission-start, .course-entry { min-height: 44px; }
.mission-start {
  display: inline-flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 14px;
  border: 1px solid var(--handbook-moss); border-radius: 12px; background: var(--handbook-moss); color: #fff;
  font-weight: 700; cursor: pointer;
  transition-property: transform, background-color, border-color, box-shadow, color;
  transition-duration: 180ms; transition-timing-function: ease-out;
}
.mission-start:hover, .mission-start:focus-visible { background: #214a30; box-shadow: 0 0 0 3px rgba(49,95,62,.25); outline: none; }
.mission-start:active, .course-entry:active, .btn:active { transform: scale(.96); }
.mission-status { min-height: 1.6em; margin: 12px 0 0; color: #466a4e; font-size: .85rem; }
.today-mission.is-complete { background: linear-gradient(145deg, #fffdf6, #dcebc9); }
@media (max-width: 768px) {
  body { background-attachment: scroll; }
  .collage-hero { min-height: auto; border-radius: 0; }
  .today-mission { padding: 20px; }
  .section { border-radius: 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  body { background-attachment: scroll; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  .card:hover, .course-entry:active, .mission-start:active, .btn:active { transform: none; }
}
~~~

- [ ] **Step 4: Run checks and commit**

Run: npm.cmd run build && npm.cmd run verify:interface && npm.cmd run verify:uiux && git diff --check

Expected: all checks pass; rg -n "transition: all|scale\\(.97\\)" prototype/index.html reports no active handbook rule.

~~~bash
git add prototype/index.html scripts/verify-interface.mjs
git commit -m "feat: refine spring handbook visual system"
~~~

### Task 3: Add course outcomes and a safe reader next-practice path

**Files:**
- Modify: prototype/index.html (reader, course entry, and final visual blocks)
- Modify: scripts/verify-interface.mjs

**Interfaces:**
- Consumes: entryLabelByKey, content, openReader(key).
- Produces: courseOutcomeByKey, nextPracticeByKey, and renderPracticeHint(key).

- [ ] **Step 1: Write failing assertions**

~~~js
for (const marker of [
  'const courseOutcomeByKey = {',
  'function renderPracticeHint(key)',
  'class="practice-hint"',
  'renderPracticeHint(key);',
  '.practice-hint {'
]) {
  if (!html.includes(marker)) throw new Error('Missing practice path marker: ' + marker);
}
~~~

Run: npm.cmd run verify:interface

Expected: FAIL with Missing practice path marker.

- [ ] **Step 2: Add UI-only outcomes for existing course keys and update generated metadata**

Insert after entryLabelByKey:

~~~js
const courseOutcomeByKey = {
  ai_poster: '产出：一张 AI 海报初稿',
  ai_ppt: '产出：一份演示大纲',
  ai_video: '产出：一条短视频脚本',
  ai_dashboard: '产出：一个数据看板草图',
  cursor: '产出：一次本地代码修改',
  github: '产出：一次项目导入',
  ai_prd_guide: '产出：一份 AI PRD',
  prd_to_ui: '产出：一张界面线框图',
  call_insight_stitch: '产出：一个可演示原型',
  uiux_tools_map: '产出：一份工具选择清单'
};
~~~

Replace meta.textContent = metaText; in initLearningEntries() with:

~~~js
meta.textContent = courseOutcomeByKey[key] || metaText;
meta.setAttribute('aria-label', '学习信息：' + meta.textContent);
~~~

- [ ] **Step 3: Add the safe next-practice renderer and call it from openReader**

Insert before openReader(key):

~~~js
const nextPracticeByKey = {
  ai_poster: { key: 'ai_ppt', label: '继续：用 AI 制作一份演示大纲' },
  ai_prd_guide: { key: 'prd_to_ui', label: '继续：把 PRD 画成界面线框图' },
  prd_to_ui: { key: 'call_insight_stitch', label: '继续：完成 Call Insight 原型实操' }
};

function renderPracticeHint(key) {
  const article = document.getElementById('article');
  const next = nextPracticeByKey[key];
  if (!article || !next || !content[next.key]) return;
  const hint = document.createElement('aside');
  hint.className = 'practice-hint';
  hint.setAttribute('aria-label', '下一步实践');
  hint.innerHTML = '<span>下一步实践</span><strong>' + next.label + '</strong>';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '打开下一篇 →';
  button.addEventListener('click', () => openReader(next.key));
  hint.append(button);
  article.append(hint);
}
~~~

Immediately after article.innerHTML = data.html; in openReader(key), add renderPracticeHint(key);.

- [ ] **Step 4: Add reader handoff styles**

~~~css
.kind-meta { color: #57705b; font: 600 .72rem/1.5 var(--mono); letter-spacing: .03em; }
.practice-hint {
  display: grid; gap: 10px; margin: 40px 0 8px; padding: 20px;
  border: 1px dashed var(--handbook-moss); border-radius: 16px; background: #edf3dc;
}
.practice-hint > span { color: var(--handbook-moss); font: 700 .72rem/1 var(--mono); letter-spacing: .1em; }
.practice-hint button {
  min-height: 44px; justify-self: start; padding: 10px 14px; border: 1px solid var(--handbook-moss);
  border-radius: 999px; background: var(--handbook-paper); color: var(--handbook-moss); font-weight: 700; cursor: pointer;
  transition-property: transform, background-color, border-color, box-shadow, color;
  transition-duration: 180ms; transition-timing-function: ease-out;
}
.practice-hint button:hover, .practice-hint button:focus-visible { background: var(--handbook-moss); color: #fff; outline: 3px solid rgba(49,95,62,.25); outline-offset: 2px; }
.practice-hint button:active { transform: scale(.96); }
~~~

- [ ] **Step 5: Run full verification, detector, visual checks, and commit**

Run:

~~~bash
npm.cmd run build
npm.cmd run verify:uiux
npm.cmd run verify:interface
git diff --check
node C:/Users/杨鲁斌/.codex/skills/impeccable/scripts/detect.mjs --json prototype/index.html
~~~

Expected: both verifiers pass, the diff check is silent, and the detector has no unresolved structural issue. Inspect one desktop and one mobile viewport: mission opens AI poster; completion updates mission text; card primary and tag entries open the same reader; reader next practice opens its mapped course; focus is visible; reduced motion has no meaningful transform movement.

~~~bash
git add prototype/index.html scripts/verify-interface.mjs
git commit -m "feat: connect learning outcomes and practice paths"
~~~

## Plan self-review

- Spec coverage: Task 1 delivers the mission-first homepage and progress sync; Task 2 delivers the spring-handbook visual language, responsive behavior, interaction states, and motion constraints; Task 3 delivers outcomes, card metadata, and reader handoff.
- Placeholder scan: no unfinished placeholder, generic test instruction, or undefined helper remains.
- Interface consistency: each helper reuses content, completedKeys, openReader, and updateProgress; each next-practice target is checked before rendering.
