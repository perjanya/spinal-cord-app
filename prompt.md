You are an expert full-stack developer, game designer, and medical education technologist.

Build a **web-based standalone interactive educational app** for learning **Ascending and Descending tracts of the spinal cord and their brain connections**.

## 🧱 TECH STACK

* Frontend: React (with Vite)
* Styling: Tailwind CSS
* Animation: Framer Motion
* State Management: Zustand (lightweight)
* SVG Handling: React-SVG + D3.js (for interactivity)
* Backend: None required initially (static JSON-based content)
* Deployment: Vercel
* Version Control: GitHub

---

## 🎮 CORE CONCEPT

The app is a **layer-based interactive exploration game**.

### 🌄 BASE VIEW

* Background: Full spinal cord SVG
* User can click "Enter Layer"
* On entering:

  * Cord "opens" (animated)
  * Specific **tract is highlighted**
  * Related pathways extend to brain regions (SVG overlays)

---

## 🧭 LAYERS (MODULAR SYSTEM)

Each layer should be implemented as a separate module:

1. Anatomy Layer
2. Physiology Layer
3. Pathology Layer
4. Neurology Layer
5. Surgery Layer
6. AI Layer
7. Philosophical Layer

Each layer must:

* Load dynamically
* Use the same base SVG but different overlays and metadata

---

## 🧩 EACH LAYER MUST INCLUDE

### 1. 🔍 Tract Visualization

* Highlight tract (ascending/descending)
* Animate signal flow (direction arrows)
* Show connections (brainstem, cortex, cerebellum)

### 2. 🧠 Context Panel (Right Side UI)

Tabs inside panel:

* Overview
* Pathway
* Function
* Clinical Relevance

---

### 3. 🌍 Daily Life Integration

* Show real-world examples
  Example:

  * Spinothalamic → pain from touching hot object
  * Corticospinal → writing, walking

---

### 4. 🎬 Snippet Videos

* Placeholder video popups (modal)
* Accept future embedding (YouTube/local MP4)

---

### 5. 🧪 Clinical Scenarios

* MCQ-based interactions
* JSON-driven
* Immediate feedback with explanation

---

### 6. 🩺 Clinical Presentation Snippets

* Short case-based popups:

  * “Patient presents with loss of vibration sense…”
  * User guesses tract involved

---

### 7. 🕉️ Philosophical Integration

* Display relevant shlokas from:

  * Bhagavad Gita
  * Bhagavatam
* Map concept:

  * Sensory control → mindfulness
  * Motor control → karma yoga

---

## 🧠 GAME MECHANICS

### 🎯 Modes

1. Explore Mode (free navigation)
2. Quiz Mode (timed)
3. Case Challenge Mode

---

### 🧮 Scoring System

* Correct answers → points
* Unlock higher layers progressively
* Badge system:

  * "Neuro Explorer"
  * "Clinical Thinker"
  * "Master of Tracts"

---

## 📁 PROJECT STRUCTURE

/src
/components
SpinalCordViewer.jsx
LayerSelector.jsx
TractHighlighter.jsx
InfoPanel.jsx
QuizEngine.jsx
VideoModal.jsx

/layers
anatomy.js
physiology.js
pathology.js
neurology.js
surgery.js
ai.js
philosophy.js

/data
tracts.json
clinical_cases.json
shlokas.json

/store
useAppStore.js

/utils
svgHelpers.js

---

## 🎨 UI/UX REQUIREMENTS

* Dark theme (neural aesthetic)
* Glow effects for active tracts
* Smooth transitions (Framer Motion)
* Responsive (desktop-first, tablet support)

---

## 🧬 SVG INTERACTION REQUIREMENTS

* Accept externally provided SVG files
* Each tract must have:

  * unique ID
  * hover interaction
  * click to activate
* Animate stroke-dashoffset for signal flow

---

## 🔌 DATA FORMAT (TRACTS.JSON EXAMPLE)

{
"spinothalamic": {
"type": "ascending",
"function": "Pain and temperature",
"pathway": ["Receptor", "Spinal cord", "Thalamus", "Cortex"],
"clinical": "Loss leads to contralateral pain loss",
"daily_example": "Touching a hot surface",
"video": "link_here"
}
}

---

## 🚀 DEPLOYMENT SETUP

### Step 1: Initialize Project

npm create vite@latest neuro-tracts-app -- --template react
cd neuro-tracts-app
npm install

### Step 2: Install Dependencies

npm install tailwindcss framer-motion zustand d3 react-svg

### Step 3: Tailwind Setup

npx tailwindcss init -p

### Step 4: Run App

npm run dev

---

## 🌐 GITHUB SETUP

git init
git add .
git commit -m "Initial commit - Neuro Tracts App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/neuro-tracts-app.git
git push -u origin main

---

## ☁️ VERCEL DEPLOYMENT

* Connect GitHub repo to Vercel
* Framework: Vite
* Build command: npm run build
* Output directory: dist

---

## 🧪 TESTING STRATEGY

* Unit tests: Vitest
* Component tests: React Testing Library
* Manual:

  * Layer switching
  * SVG interaction
  * Quiz validation

---

## 🧠 FUTURE EXTENSIONS

* AI chatbot for tract explanation
* Voice narration
* AR/VR integration
* Multiplayer quiz mode

---

## ⚡ FINAL REQUIREMENT

Generate:

1. Complete working React project
2. Sample SVG integration
3. At least 2 tracts implemented fully
4. One complete layer (Anatomy) fully functional
5. One quiz example
6. One philosophical mapping example

Ensure code is clean, modular, and production-ready.
