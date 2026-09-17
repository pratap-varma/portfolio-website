# Pratap Varma AI Engineer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch a high-performance, aesthetic personal AI engineer portfolio web application for Pratap Varma inspired by the *Kamui* twilight anime/neo-zen game UI reference, integrating all 8 projects, experiences, certifications, skills, and interactive features.

**Architecture:** Zero-build modern web architecture with semantic HTML5, modular CSS3 (custom design system, glassmorphism, responsive Bento grids), and vanilla ES6+ JavaScript modules (interactive HTML5 canvas with floating sakura petals and AI neural graph, interactive Gemini prompt sandbox, project detail modal drawer, audio chime effects, and dark/light theme engine).

**Tech Stack:** HTML5, Modern CSS3 (CSS Variables, Backdrop Filter Glassmorphism, Grid/Flexbox), Vanilla ES6+ JavaScript, HTML5 Canvas API, Web Audio API.

**Spec:** `docs/superpowers/specs/2026-09-17-pratap-varma-portfolio-design.md`

## Global Constraints
- Pure zero-build architecture: no npm install or node_modules needed to run.
- High visual fidelity to the *Kamui* Pinterest reference: atmospheric twilight sky gradient (`#0a0b12` to `#3e224e`), glowing lanterns, pagoda silhouette, Japanese watermark typography (`プラタップ・ヴァルマ` / `人工知能`), drifting sakura petals, and frosted glass cards.
- Complete content fidelity: all 8 projects, 4 experiences, 4 hackathons/events, 14+ certifications, technical arsenal, approach, and "Beyond Code" hobbies.
- 100% responsive across desktop, tablet, and mobile with keyboard accessibility.

---

### Task 1: Scaffolding, Theme Tokens & Twilight Landscape Styling
**Files:**
- Create: `css/main.css`
- Create: `css/landscape.css`
- Create: `css/glass.css`
- Create: `css/bento.css`
- Create: `css/modal.css`

- [ ] **Step 1: Create design system variables and reset in `css/main.css`** (fonts, colors, twilight gradients, AI cyan/violet accents, light/dark theme CSS variables).
- [ ] **Step 2: Create `css/landscape.css`** for the illustrated atmospheric hero backdrop (layered silhouette mountains, glowing pagoda, arched wooden bridge, warm lantern glow pulses, animated water reflections).
- [ ] **Step 3: Create `css/glass.css`, `css/bento.css`, and `css/modal.css`** for glassmorphic cards, Bento grid layouts, pill badges, and detail drawer overlays.
- [ ] **Step 4: Commit**
```bash
git add css/
git commit -m "style: add modern twilight design system, landscape, and glass styles"
```

---

### Task 2: Interactive HTML5 Canvas Engine (Sakura Petals & AI Neural Graph)
**Files:**
- Create: `js/canvas-petals.js`

- [ ] **Step 1: Implement particle physics simulation** combining drifting cherry blossom petals (wind drift, flutter, rotation) with glowing AI neural nodes.
- [ ] **Step 2: Implement proximity line connections** between close AI nodes and mouse interaction/cursor repulsion.
- [ ] **Step 3: Implement devicePixelRatio scaling and resize handler** for razor-sharp rendering on Retina and 4K displays.
- [ ] **Step 4: Commit**
```bash
git add js/canvas-petals.js
git commit -m "feat: add interactive canvas petal and neural network simulation"
```

---

### Task 3: Projects Data Model, Playground Engine & Audio System
**Files:**
- Create: `js/projects-data.js`
- Create: `js/playground.js`
- Create: `js/theme.js`

- [ ] **Step 1: Write `js/projects-data.js`** containing complete, rich information for all 8 featured projects (J.A.R.V.I.S., TrackX, CropDiseaseAI, Paper Plot AI, Samadhan Setu, Personal Finance AI, Automated Attendance Portal, Productivity Chrome Extensions) with Problem, Solution, Architecture, Features, and Links.
- [ ] **Step 2: Write `js/playground.js`** creating the interactive Gemini Prompt & AI Agent sandbox simulation with realistic streaming responses and preset prompts.
- [ ] **Step 3: Write `js/theme.js`** supporting ambient sound synth (zen wind chime via Web Audio API) and dark/light theme switching with `localStorage` persistence.
- [ ] **Step 4: Commit**
```bash
git add js/projects-data.js js/playground.js js/theme.js
git commit -m "feat: add projects data model, prompt sandbox, and theme engine"
```

---

### Task 4: Master HTML & Interactive Application Logic
**Files:**
- Create: `index.html`
- Create: `js/app.js`

- [ ] **Step 1: Create semantic `index.html`** structuring the floating frosted glass header, hero section with watermark calligraphy and lantern, About Bento, Skills Matrix, Playground, Projects Bento, Experience/Hackathon timeline, Certifications vault, Approach pipeline, Beyond Code showcase, Currently Building ticker, and Contact card.
- [ ] **Step 2: Create `js/app.js`** wiring up modal dialogs, category filter buttons, stats count-up animation, mobile drawer toggle, and copy-email toasts.
- [ ] **Step 3: Commit**
```bash
git add index.html js/app.js
git commit -m "feat: implement master portfolio page and interactive application logic"
```

---

### Task 5: Launch Local Preview & Verification via Browser Subagent
**Files:**
- Test via browser subagent and local HTTP server

- [ ] **Step 1: Start a lightweight HTTP static server** on port 3000 (e.g., using Python `http.server` or `npx serve`).
- [ ] **Step 2: Dispatch browser subagent** to navigate to `http://localhost:3000`, verify page load, inspect visuals, test project modal, test theme toggle, test filter buttons, and capture visual screenshots.
- [ ] **Step 3: Verify zero console errors and smooth animations**.
- [ ] **Step 4: Commit final changes**.
```bash
git add .
git commit -m "feat: complete Pratap Varma AI engineer portfolio implementation and verification"
```
