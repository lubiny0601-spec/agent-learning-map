# Reading-First Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Chinese-English typography in the learning map stable, scannable, and comfortable for long-form learning without changing content or behavior.

**Architecture:** Extend the existing final visual-system CSS override in `prototype/index.html`; no templates, content mappings, DOM structure, or external assets change. Extend the existing dependency-free interface verifier with typography invariants so future style edits cannot silently remove CJK fallback, readable line height, or mobile title limits.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript build pipeline, Node.js static verification.

## Global Constraints

- Preserve all course content, section order, background asset, course entries, reader, search, progress, mobile navigation, build process, and local progress format.
- Do not download or embed a new Chinese font file, create external font requests, or add a runtime dependency.
- Use `Instrument Sans`, `PingFang SC`, `Microsoft YaHei`, and `Noto Sans CJK SC` in that fallback order.
- Keep card labels, focus states, 44px hit targets, responsive navigation, and reduced-motion behavior working.
- Do not change any course copy or replace the interface with a decorative or serif display style.

---

### Task 1: Apply Typography Assertions and the Reading-First Type System

**Files:**
- Modify: `scripts/verify-interface.mjs`
- Modify: `prototype/index.html`

**Interfaces:**
- Consumes: UTF-8 source of `prototype/index.html`
- Produces: typography markers verified by `npm.cmd run verify:interface`

- [ ] **Step 1: Add the failing assertions**

Append this exact block after the current interface assertions:

```js
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
```

- [ ] **Step 2: Run the focused check and confirm the red state**

Run: `npm.cmd run verify:interface`

Expected: FAIL with `Missing typography marker: --font: 'Instrument Sans', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC'`.

- [ ] **Step 3: Update the final typography tokens and global rhythm**

In the final visual-system style block, replace the existing final `--font` definition and add these exact rules after `body`:

```css
--font: 'Instrument Sans', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

html { font-synthesis: none; }
body { line-height: 1.72; letter-spacing: 0; }
```

- [ ] **Step 4: Replace the final heading and reading rules**

Replace the final `h1`, `h2`, `h3`, `.lead`, and text rules with this complete block:

```css
h1, h2, h3 { color: var(--ink); font-family: var(--font); }
h1 { max-width: 760px; font-size: clamp(2.35rem, 5.6vw, 4.4rem); font-weight: 700; letter-spacing: -.035em; line-height: 1.18; }
h2 { font-size: clamp(1.8rem, 3.8vw, 3.2rem); font-weight: 700; letter-spacing: -.03em; line-height: 1.22; }
h3 { font-size: 1.28rem; font-weight: 700; letter-spacing: -.015em; line-height: 1.35; }
.lead, .section-head p, .card p, .footer-cta p { color: var(--ink); font-weight: 400; letter-spacing: 0; }
.lead { max-width: 680px; font-size: 1.1rem; line-height: 1.8; }
.section-head p { max-width: 680px; line-height: 1.8; }
.card h3 { margin: 18px 0 10px; }
.card p { font-size: .98rem; line-height: 1.75; }
.article { font-size: 1rem; }
.article p, .article li { color: var(--ink); line-height: 1.85; letter-spacing: 0; }
.article h2 { font-size: clamp(1.65rem, 3vw, 2.35rem); line-height: 1.28; }
.article h3 { font-size: 1.22rem; line-height: 1.4; }
.card .kind, .kind-meta { line-height: 1.5; }
```

- [ ] **Step 5: Add the mobile title cap**

Inside the final `@media (max-width: 560px)` block, replace the current `h1` rule with:

```css
h1 { font-size: clamp(2.2rem, 11vw, 3.15rem); line-height: 1.2; }
h2 { font-size: clamp(1.7rem, 9vw, 2.2rem); line-height: 1.25; }
```

- [ ] **Step 6: Run the focused check and confirm the green state**

Run: `npm.cmd run verify:interface`

Expected: PASS with exit code 0.

- [ ] **Step 7: Commit the typography slice**

```powershell
git add prototype/index.html scripts/verify-interface.mjs
git commit -m "feat: refine reading-first typography"
```

---

### Task 2: Rebuild and Verify All Existing Behavior

**Files:**
- Verify: `prototype/index.html`
- Verify: `scripts/verify-uiux.mjs`
- Verify: `scripts/verify-interface.mjs`

**Interfaces:**
- Consumes: rebuilt compiled content and the completed typography CSS
- Produces: verified clean worktree with no functional regression

- [ ] **Step 1: Rebuild the compiled content**

Run: `npm.cmd run build`

Expected: `Build completed successfully! Content synchronized in prototype/index.html`.

- [ ] **Step 2: Run both verification suites**

Run: `npm.cmd run verify:uiux; npm.cmd run verify:interface`

Expected: both commands exit 0 with no thrown errors.

- [ ] **Step 3: Confirm the source contains the final visual rules**

Run:

```powershell
rg -n "PingFang SC|font-synthesis: none|line-height: 1.85|3.15rem|course-entry|uiux-reference" prototype/index.html
```

Expected: all requested typography markers and retained interactive markers appear in the final source.

- [ ] **Step 4: Check whitespace and worktree scope**

Run: `git diff --check; git status --short`

Expected: no whitespace errors and only the intended implementation files changed before the commit, or a clean worktree afterward.
