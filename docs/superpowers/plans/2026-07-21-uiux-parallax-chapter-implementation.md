# UI/UX 递进章节与视差首屏 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** 将学习地图首页改造成绿色拼贴式视差首屏，并新增三张可独立阅读、可打开原始演示资源的 UI/UX 实操课程卡。

**Architecture:** 保持现有单文件静态原型与 Markdown 编译模式：课程正文放在 \`content/uiux/\`，构建脚本将其嵌入 \`prototype/index.html\` 的 \`content\` 对象。首页和新章节在该原型内增加语义标记、CSS 和滚动驱动的变换；两份 HTML 和线框图作为静态资源放入 \`prototype/uiux/\`。

**Tech Stack:** HTML5、CSS3、原生 JavaScript、Node.js ESM、PowerShell、GitHub Pages。

## Global Constraints

- 不引入新的运行时依赖、框架或构建工具。
- 保持现有搜索、阅读器、进度存储和 Prompt 工具可用。
- 动效只修改 \`transform\` 或 \`opacity\`，通过一个 \`requestAnimationFrame\` 合并滚动更新。
- 必须支持 \`prefers-reduced-motion: reduce\`，并在窄屏上避免横向溢出。
- 只使用用户提供的 UI/UX 材料；新章节固定为 Part A → Part B → Part C，置于 PRD 之后、部署之前。

---

## File structure

- \`content/uiux/prd-to-ui-guide.md\`：Part A 独立课程正文。
- \`content/uiux/call-insight-stitch-workshop.md\`：Part B 独立实操正文。
- \`content/uiux/uiux-tools-map.md\`：Part C 独立工具选择正文。
- \`content/uiux/call-insight-stitch-brief.md\`：完整设计简报。
- \`prototype/uiux/\`：两份原始 HTML 与低保真线框图。
- \`scripts/build.js\`：新增四个内容键。
- \`prototype/index.html\`：新增导航、拼贴首屏、UI/UX 章节、响应式样式和视差控制器。
- \`scripts/verify-uiux.mjs\`：构建后的结构验证。
- \`README.md\`：内容清单与课程数量。

## Task 1: Add content, resources, and a failing resource check

**Files:**
- Create: \`content/uiux/prd-to-ui-guide.md\`
- Create: \`content/uiux/call-insight-stitch-workshop.md\`
- Create: \`content/uiux/uiux-tools-map.md\`
- Create: \`content/uiux/call-insight-stitch-brief.md\`
- Create: \`prototype/uiux/prd-to-ui-workshop.html\`
- Create: \`prototype/uiux/uiux-tools-map.html\`
- Create: \`prototype/uiux/call-insight-low-fi-wireframe.png\`
- Create: \`scripts/verify-uiux.mjs\`

**Consumes:** 用户提供的 Part A、Part B、Part C、Stitch brief 和 Call Insight 低保真线框图。

**Produces:** 四个 Markdown 课程来源、三个可访问资源和一个可重复运行的验证入口。

- [ ] **Step 1: Write the failing resource test**

\`\`\`js
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
  if (!fs.existsSync(path.resolve(file))) throw new Error('Missing UI/UX resource: ' + file);
}
\`\`\`

- [ ] **Step 2: Run the failing test**

Run: \`node scripts/verify-uiux.mjs\`

Expected: exits with \`Error: Missing UI/UX resource: content/uiux/prd-to-ui-guide.md\`.

- [ ] **Step 3: Add the supplied materials**

Create the three standalone course documents. Part A must cover PRD information completion, low-fi flow, page inventory, design rules, acceptance and delivery. Part B must cover material upload, Stitch first draft, eight optimisation prompts, prototype checking, MCP handoff, DESIGN.md, frontend demo and update loop. Part C must explain the four tool-decision moments: first UI generation, delivery optimisation, interaction polish and design-standardisation.

Use these fixed resource links in the relevant articles:

\`\`\`markdown
[查看原始 HTML 演示](uiux/prd-to-ui-workshop.html)
[查看高清低保真线框图](uiux/call-insight-low-fi-wireframe.png)
[查看原始 UI/UX 工具地图](uiux/uiux-tools-map.html)
\`\`\`

Copy the supplied Part A HTML, Part C HTML and low-fi PNG into the stated \`prototype/uiux/\` paths. Copy the supplied Stitch brief into \`content/uiux/call-insight-stitch-brief.md\`.

- [ ] **Step 4: Run the resource test**

Run: \`node scripts/verify-uiux.mjs\`

Expected: exits with code 0.

- [ ] **Step 5: Commit**

\`\`\`powershell
git add content/uiux prototype/uiux scripts/verify-uiux.mjs
git commit -m "feat: add UIUX learning resources"
\`\`\`

## Task 2: Compile course content and test the generated keys

**Files:**
- Modify: \`scripts/build.js\`
- Modify: \`scripts/verify-uiux.mjs\`
- Modify: \`package.json\`
- Modify: \`prototype/index.html\`

**Consumes:** The four Markdown files from Task 1.

**Produces:** \`prd_to_ui\`, \`call_insight_stitch\`, \`uiux_tools_map\`, and \`call_insight_stitch_brief\` in the generated reader data.

- [ ] **Step 1: Extend the failing test**

Add this block after the resource check:

\`\`\`js
const prototype = fs.readFileSync(path.resolve('prototype/index.html'), 'utf8');
for (const key of ['prd_to_ui', 'call_insight_stitch', 'uiux_tools_map', 'call_insight_stitch_brief']) {
  if (!prototype.includes('"' + key + '": {')) throw new Error('Missing compiled content key: ' + key);
}
\`\`\`

- [ ] **Step 2: Run the test**

Run: \`node scripts/verify-uiux.mjs\`

Expected: \`Error: Missing compiled content key: prd_to_ui\`.

- [ ] **Step 3: Add compiler entries**

Add exactly these map entries in \`scripts/build.js\`:

\`\`\`js
  prd_to_ui: 'content/uiux/prd-to-ui-guide.md',
  call_insight_stitch: 'content/uiux/call-insight-stitch-workshop.md',
  uiux_tools_map: 'content/uiux/uiux-tools-map.md',
  call_insight_stitch_brief: 'content/uiux/call-insight-stitch-brief.md',
\`\`\`

Add \`"verify:uiux": "node scripts/verify-uiux.mjs"\` to \`package.json\`, then run \`npm run build\`.

- [ ] **Step 4: Run the passing test**

Run: \`npm run verify:uiux\`

Expected: exits with code 0.

- [ ] **Step 5: Commit**

\`\`\`powershell
git add scripts/build.js scripts/verify-uiux.mjs package.json prototype/index.html
git commit -m "feat: compile UIUX course content"
\`\`\`

## Task 3: Build the collage-style parallax home hero

**Files:**
- Modify: \`prototype/index.html\`
- Modify: \`scripts/verify-uiux.mjs\`

**Consumes:** Existing hero, navigation, search, progress UI and reader.

**Produces:** A \`#heroCollage\` home hero with far/mid/near layers and an accessible static fallback.

- [ ] **Step 1: Extend the failing test**

\`\`\`js
for (const marker of ['id="heroCollage"', 'data-parallax="far"', 'data-parallax="mid"', 'data-parallax="near"', 'prefers-reduced-motion: reduce']) {
  if (!prototype.includes(marker)) throw new Error('Missing parallax marker: ' + marker);
}
\`\`\`

- [ ] **Step 2: Run the test**

Run: \`npm run verify:uiux\`

Expected: \`Error: Missing parallax marker: id="heroCollage"\`.

- [ ] **Step 3: Implement the semantic collage hero**

Replace the existing hero wrapper with this structural pattern while retaining the existing search, progress and quick-start content in the foreground:

\`\`\`html
<section class="hero collage-hero" id="heroCollage" aria-labelledby="heroTitle">
  <div class="collage-layer collage-far" data-parallax="far" aria-hidden="true"></div>
  <div class="collage-layer collage-mid" data-parallax="mid" aria-hidden="true"></div>
  <div class="hero-main collage-copy">
    <p class="eyebrow">AI LEARNING FIELD NOTES</p>
    <h1 id="heroTitle">给 AI 初学者的一张工具学习路线图</h1>
    <p>从理解需求到做出可交付的 AI 工具，把每一步沉淀成可以反复回看的学习路径。</p>
  </div>
  <div class="collage-layer collage-near" data-parallax="near" aria-hidden="true"></div>
</section>
\`\`\`

Use a bright green-to-cream background, black type, rounded paper cards, soft shadows, small route notes and course-specific labels: \`想法 → PRD\`, \`PRD → UI\`, \`UI → Demo\`. Do not introduce decorative people or unrelated stock images.

Use transform-only CSS and a static fallback:

\`\`\`css
.collage-layer { transform: translate3d(0, var(--parallax-y, 0px), 0); will-change: transform; }
.collage-far { --depth: .15; }
.collage-mid { --depth: .45; }
.collage-near { --depth: 1; }
@media (prefers-reduced-motion: reduce) {
  .collage-layer, .uiux-card { transform: none !important; transition: none !important; }
}
\`\`\`

- [ ] **Step 4: Add one passive-scroll controller**

\`\`\`js
const parallaxLayers = [...document.querySelectorAll('[data-parallax]')];
let parallaxQueued = false;
function updateParallax() {
  const offset = Math.min(window.scrollY, 900);
  parallaxLayers.forEach((layer) => {
    const speed = { far: 0.15, mid: 0.45, near: 1 }[layer.dataset.parallax] || 0;
    layer.style.setProperty('--parallax-y', Math.round(offset * speed * -0.12) + 'px');
  });
  parallaxQueued = false;
}
window.addEventListener('scroll', () => {
  if (!parallaxQueued) {
    parallaxQueued = true;
    requestAnimationFrame(updateParallax);
  }
}, { passive: true });
updateParallax();
\`\`\`

- [ ] **Step 5: Build, verify and commit**

Run:

\`\`\`powershell
npm run build
npm run verify:uiux
git add prototype/index.html scripts/verify-uiux.mjs
git commit -m "feat: add collage parallax homepage"
\`\`\`

Expected: build completes and verification exits with code 0.

## Task 4: Add the three-card UI/UX chapter

**Files:**
- Modify: \`prototype/index.html\`
- Modify: \`scripts/verify-uiux.mjs\`
- Modify: \`README.md\`

**Consumes:** The four course keys from Task 2 and the visual primitives from Task 3.

**Produces:** A \`#uiux\` navigation target, three reader-opening course cards and an updated project inventory.

- [ ] **Step 1: Extend the failing test**

\`\`\`js
for (const marker of [
  'href="#uiux"',
  'id="uiux"',
  'data-key="prd_to_ui"',
  'data-key="call_insight_stitch"',
  'data-key="uiux_tools_map"',
  'uiux/call-insight-low-fi-wireframe.png'
]) {
  if (!prototype.includes(marker)) throw new Error('Missing UI/UX chapter marker: ' + marker);
}
\`\`\`

- [ ] **Step 2: Run the test**

Run: \`npm run verify:uiux\`

Expected: \`Error: Missing UI/UX chapter marker: href="#uiux"\`.

- [ ] **Step 3: Implement navigation and the section**

Add \`<a href="#uiux">UI/UX 实操</a>\` to the existing navigation. Add the section immediately after \`#prd\` and before \`#deployment\`:

\`\`\`html
<section class="section uiux-section" id="uiux" aria-labelledby="uiuxTitle">
  <div class="uiux-stage" aria-hidden="true">
    <span data-parallax="far">PRD</span><span data-parallax="mid">线框图</span><span data-parallax="near">高保真 UI</span>
  </div>
  <div class="section-head">
    <div><p class="eyebrow">UI/UX PRACTICE PATH</p><h2 id="uiuxTitle">从 PRD 到可交付 UI</h2><p>把业务需求、线框图、设计生成和前端交付连成一条可反复练习的路径。</p></div>
  </div>
  <div class="card-grid uiux-grid">
    <article class="card uiux-card" data-key="prd_to_ui">…</article>
    <article class="card uiux-card" data-key="call_insight_stitch">…</article>
    <article class="card uiux-card" data-key="uiux_tools_map">…</article>
  </div>
  <p class="uiux-outcome">最终成果：PRD → 低保真线框图 → 高保真 UI → 前端 Demo</p>
</section>
\`\`\`

Fill each card with part number, title, learning outcome, time estimate and CTA. Every card must use its matching \`openReader\` handler, \`role="button"\`, \`tabindex="0"\`, an \`aria-label\` and an Enter/Space keyboard handler. Style desktop as 3 columns, mobile as 1 column. Use slight rotation at rest and safe upward hover, with no animated movement under reduced-motion.

- [ ] **Step 4: Update README**

Add these content rows and change the stated total from 25 to 29:

\`\`\`markdown
| UI/UX Part A：从 PRD 迈向 UI | \`content/uiux/prd-to-ui-guide.md\` | 从需求到 UI 设计与开发交付 |
| UI/UX Part B：Call Insight × Stitch | \`content/uiux/call-insight-stitch-workshop.md\` | 移动端高保真 UI 实操闭环 |
| UI/UX Part C：工具地图 | \`content/uiux/uiux-tools-map.md\` | 四类 UI/UX 工具的选择方法 |
| Call Insight Stitch 设计简报 | \`content/uiux/call-insight-stitch-brief.md\` | Part B 的完整参考材料 |
\`\`\`

- [ ] **Step 5: Build, verify and commit**

Run:

\`\`\`powershell
npm run build
npm run verify:uiux
git diff --check
git add README.md prototype/index.html scripts/verify-uiux.mjs
git commit -m "feat: add UIUX practice chapter"
\`\`\`

Expected: the build and verification succeed; \`git diff --check\` has no output.

## Task 5: Final verification and handoff

**Files:**
- Verify: \`prototype/index.html\`
- Verify: \`prototype/uiux/\`
- Verify: \`content/uiux/\`

**Consumes:** Tasks 1–4.

**Produces:** Reproducible build, valid static links and clean handoff.

- [ ] **Step 1: Run all final checks**

\`\`\`powershell
npm run build
npm run verify:uiux
git diff --check
rg -n 'uiux/prd-to-ui-workshop.html|uiux/uiux-tools-map.html|uiux/call-insight-low-fi-wireframe.png|data-key="(prd_to_ui|call_insight_stitch|uiux_tools_map)"' prototype/index.html
git status --short --branch
\`\`\`

Expected: build prints \`Build completed successfully! Content synchronized in prototype/index.html\`; verification exits with code 0; all three resource paths and all three card keys are found; no whitespace errors.

- [ ] **Step 2: Commit generated output only if changed**

\`\`\`powershell
git add prototype/index.html
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m "chore: sync UIUX generated content" }
\`\`\`

- [ ] **Step 3: Hand off**

Report the homepage visual treatment, three course cards, original-material links, reduced-motion fallback and successful build verification. Link the user to \`prototype/index.html\` for local viewing.

## Self-review

- **Spec coverage:** Tasks 1–2 supply and compile all requested materials; Task 3 delivers the homepage collage and three visual depths; Task 4 adds navigation, chapter cards, responsive behavior and documentation; Task 5 verifies final output.
- **Placeholder scan:** No deferred work or unspecified implementation steps remain.
- **Interface consistency:** Task 2 declares the course keys used unchanged by Task 4; Task 1 creates the resource paths verified by Tasks 4 and 5.

