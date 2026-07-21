# Figma Visual Rebuild Implementation Plan

> For agentic workers: execute this plan task-by-task and mark each checkbox as completed.

**Goal:** Rebuild the learning map's visual system with the selected design rules while preserving every learning workflow and resource link.

**Architecture:** Keep the existing static HTML, compiled Markdown reader and JavaScript behavior. Replace global tokens and component styles in prototype/index.html, add responsive navigation, and extend the existing structural verifier so the rebuild remains testable without a browser.

**Tech Stack:** HTML5, CSS3, native JavaScript, Node.js ESM, GitHub Pages.

## Global Constraints

- Preserve all content keys, course cards, reader behavior, progress storage, search, Prompt builder and UI/UX source-resource links.
- Use black and white as the chrome; use only lime, lilac, cream, mint, pink, coral and navy as section panels.
- Use Instrument Sans and JetBrains Mono as non-proprietary replacements; mono is taxonomy only.
- Remove legacy glassmorphism, global gradients, translucent surfaces and broad soft shadows.
- Buttons are pills, inputs/small tiles are 8px, large panels are 24px, and mobile targets are at least 44px.
- Keep parallax only on decorative stickers; disable it under reduced-motion.
- Do not use the source brand name, logo, proprietary font, original copy or assets.

---

## File structure

- prototype/index.html: tokens, components, section surfaces, navigation and responsive styles.
- scripts/verify-uiux.mjs: static assertions for visual tokens and preserved UI/UX functionality.
- README.md: project-specific visual-system note.

### Task 1: Define and prove the visual contract

**Files:**
- Modify: scripts/verify-uiux.mjs

**Produces:** A repeatable failure when the visual system is absent.

- [ ] **Step 1: Add this assertion before visual implementation**

    for (const marker of [
      '--canvas: #ffffff', '--ink: #000000', '--block-lime: #dceeb1',
      '--block-lilac: #c5b0f4', '--block-navy: #1f1d3d',
      'figma-surface', 'navToggle', 'aria-expanded'
    ]) {
      if (!prototype.includes(marker)) throw new Error('Missing visual-system marker: ' + marker);
    }

- [ ] **Step 2: Verify RED**

Run: npm.cmd run verify:uiux

Expected: Error: Missing visual-system marker: --canvas: #ffffff.

- [ ] **Step 3: Commit the test**

Run: git add scripts/verify-uiux.mjs; git commit -m "test: define visual contract"

### Task 2: Replace tokens and shared components

**Files:**
- Modify: prototype/index.html
- Modify: scripts/verify-uiux.mjs

**Consumes:** Task 1 static contract.

**Produces:** White/black chrome, named pastel tokens, eight-point spacing, pill controls, border-led cards, fields and reader surfaces.

- [ ] **Step 1: Add these root tokens**

    :root {
      --canvas: #ffffff; --ink: #000000; --hairline: #e6e6e6; --surface-soft: #f7f7f5;
      --block-lime: #dceeb1; --block-lilac: #c5b0f4; --block-cream: #f4ecd6;
      --block-mint: #c8e6cd; --block-pink: #efd4d4; --block-coral: #f3c9b6;
      --block-navy: #1f1d3d; --accent-magenta: #ff3d8b; --success: #1ea64a; --max: 1280px;
    }

- [ ] **Step 2: Implement shared style rules**

Set body to white; use Instrument Sans as the display/body face and JetBrains Mono only for eyebrow/caption labels. Use 96px major section gaps, 48px large-panel padding, 24px card padding, hairline borders, and only a rare 0 4px 16px rgba(0,0,0,.06) tile shadow. Make btn and small-btn black/white pills, fields white 8px inputs with visible black focus rings, and reader a white document surface.

- [ ] **Step 3: Verify GREEN**

Run: npm.cmd run build; npm.cmd run verify:uiux; git diff --check

Expected: all commands exit with code 0.

- [ ] **Step 4: Commit**

Run: git add prototype/index.html scripts/verify-uiux.mjs; git commit -m "feat: rebuild shared visual system"

### Task 3: Recompose sections and responsive navigation

**Files:**
- Modify: prototype/index.html
- Modify: scripts/verify-uiux.mjs

**Consumes:** Task 2 tokens and components.

**Produces:** One color-block panel per story, white-canvas rhythm and an accessible mobile navigation menu.

- [ ] **Step 1: Apply exactly one surface to each existing section**

Set templates to lime, applications to cream, paths to navy, tools to mint, PRD to coral and UI/UX to lilac. Keep beginner guides, SOPs, deployment and reader on white. Add figma-surface plus one surface modifier to every colored section and remove every legacy global decorative gradient.

- [ ] **Step 2: Add the accessible menu contract**

    <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="primaryNav">菜单</button>
    <nav class="nav" id="primaryNav">…</nav>

Add a controller that toggles is-open and synchronizes aria-expanded. At 960px hide navigation links until toggled; at 560px make top-level action buttons full width and at least 44px high.

- [ ] **Step 3: Preserve decorative motion safely**

Retain data-parallax layers but use only flat cream/lilac/mint paper tiles. Retain the existing reduced-motion guard.

- [ ] **Step 4: Verify**

Run: npm.cmd run build; npm.cmd run verify:uiux; git diff --check

Expected: all commands exit with code 0.

- [ ] **Step 5: Commit**

Run: git add prototype/index.html scripts/verify-uiux.mjs; git commit -m "feat: apply section rhythm and navigation"

### Task 4: Document, verify and publish

**Files:**
- Modify: README.md
- Verify: prototype/index.html
- Verify: scripts/verify-uiux.mjs

**Produces:** Project-specific documentation, fresh build evidence and a pushed main branch.

- [ ] **Step 1: Add README note**

Describe the black-and-white workspace frame, single pastel content panels, border-led components and responsive navigation without naming or reproducing the source brand.

- [ ] **Step 2: Run final checks**

Run: npm.cmd run build; npm.cmd run verify:uiux; git diff --check; rg -n 'figma-surface|navToggle|data-key="(prd_to_ui|call_insight_stitch|uiux_tools_map)"' prototype/index.html; git status --short --branch

Expected: build and verifier pass, all three UI/UX keys remain present, and no whitespace errors occur.

- [ ] **Step 3: Commit and push**

Run: git add README.md prototype/index.html scripts/verify-uiux.mjs; git commit -m "docs: describe visual system"; git push origin main

## Self-review

- Task 1 proves the design contract fails before implementation.
- Task 2 covers colors, typography, spacing, controls, cards, forms, navigation surfaces and reader hierarchy.
- Task 3 covers section composition, interaction states, responsive behavior and reduced motion.
- Task 4 preserves the UI/UX materials, validates the generated prototype and performs the user-authorized push.
