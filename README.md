# Spinal Cord Explorer

An interactive web-based educational app for ascending and descending spinal cord tracts.

## Features

- React + Vite frontend
- Tailwind CSS styling with dark neural aesthetic
- Framer Motion animations and responsive layout
- Modular layer-based architecture
- JSON-driven quizzes and clinical cases
- Placeholder modal for future video embedding
- SVG-based tract visualization with animated flow

## Project Structure

- `/src/components` — UI components
- `/src/layers` — layer modules and metadata
- `/src/data` — tract definitions, clinical cases, philosophy snippets
- `/src/store` — Zustand state management
- `/src/utils` — helper functions

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

This project uses a static JSON-based content model and no backend.
Future improvements can include external SVG assets, embedded video content, and expanded case challenges.
