# 📘 SyllabusObject v2 — Developer README

---

## 🧱 Purpose
A micro-library for building static, deterministic syllabus structures — optimized for file-based linking, Svelte integration, and AI tooling.

This is **not** a CMS.
This is a builder for encoding fixed subject outlines — like school textbooks — into stable, queryable JSON.

---

## ✅ Installation

```bash
npm install syllabusobject
```

---

## ✅ Basic Usage

```js
import { SubjectBuilder } from "syllabusobject";

const sb = new SubjectBuilder({
  tcodeName: "fbise9physics",
  filename: "fbise9physics",
  description: "Federal Board Grade 9 Physics",
  image: "/images/fbise9physics.png",
  chapters: [
    {
      filename: "ch1_motion",
      name: "Motion",
      exercises: [
        { filename: "ex1_intro", name: "Introduction" },
        { filename: "ex2_numericals", name: "Numericals" }
      ]
    }
  ]
});

sb.getChExByFilename("ch1_motion", "ex1_intro").addQuestion({
  filename: "q001_velocity",
  name: "Define velocity",
  type: "md"
});

const syllabus = sb.toJSON();
```

---

## 🔑 Output Format (Tcode Object)

```json
{
  "tcodeName": "fbise9physics",
  "filename": "fbise9physics",
  "description": "...",
  "image": "...",
  "chapters": [
    {
      "filename": "ch1_motion",
      "name": "Motion",
      "exercises": [
        { "filename": "ex1_intro", "name": "Introduction" },
        { "filename": "ex2_numericals", "name": "Numericals" }
      ]
    }
  ],
  "questions": [
    {
      "filename": "q001_velocity",
      "name": "Define velocity",
      "type": "md",
      "chapterFilename": "ch1_motion",
      "exerciseFilename": "ex1_intro",
      "tcodeName": "fbise9physics"
    }
  ]
}
```

---

## 🧠 Design Principles

- All IDs (`filename`) are permanent and file-safe
- Structure is declared once, then frozen
- No dynamic `.addChapter()` or `.addExercise()`
- All questions must be added through validated context
- The only output is `.toJSON()` — no runtime logic or mutation

---

## 🔧 Limitations

- For v2: `chapters` and `exercises` do **not** support `description`, `image` — these will be added in v3

---

## 📁 Suggested Content File Layout

For use in SvelteKit or static builds:

```
src/lib/content/
├── fbise9physics/
│   ├── ch1_motion_ex1_intro_q001_velocity.js
│   ├── ch1_motion_ex2_numericals_q002_acceleration.js
├── fbise9math/
│   ├── ch1_algebra_ex1_intro_q007_factorization.js
```

Use `tcodeName` + `filename` to build paths in the frontend.

---

## 📬 License
MIT

---

Built for deterministic educational content at scale.
