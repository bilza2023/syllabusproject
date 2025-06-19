# SyllabusObject.md

## 🧩 Overview

The `SyllabusObject` system defines a flat, reference-based API for creating structured educational syllabi. It is optimized for clean architecture, modular authoring, and reliable content anchoring. All chapters, exercises, and questions are stored as flat arrays inside a single root object (`Tcode`). All relationships are maintained through IDs, and all insertion happens through a **scoped, structured API** — no nesting.

---

## 🧱 Core Structure

```js
Tcode {
  tcodeName: "...",
  chapters: [ Chapter ],
  exercises: [ Exercise ],
  questions: [ Question ],
  enums: {
    questionTypes: ["md", "slide"]
  }
}
```

All items are inserted through structured APIs to ensure reference integrity.

---

## 🧩 Data Models

### Chapter

```js
{
  id: Number,
  name: String,
  description?: String,
  sortOrder: Number,
  addExercise: Function // scoped to this chapter
}
```

### Exercise

```js
{
  id: Number,
  name: String,
  chapterId: Number,
  description?: String,
  sortOrder: Number,
  addQuestion: Function // scoped to this exercise
}
```

### Question

```js
{
  id: UUID,
  chapterId: Number,
  exerciseId: Number,
  type: "md" | "slide",
  sortOrder: Number,
  questionNo: Number,      // from textbook or printed syllabus
  name: String,
  questionPart?: String,   // e.g. 'a' or 'b'
  tags?: [String],         // optional classification
  slug: String,            // tcodeName:chapter:exercise:questionNoPart
  tcodeName: String        // from root
}
```

---

## ✅ API Design Principles

1. **Flat Storage** — No nesting of objects; all data is stored at root level
2. **Scoped Insertions Only** — You add:

   * `chapter = tcode.addChapter(...)`
   * `exercise = chapter.addExercise(...)`
   * `question = exercise.addQuestion(...)`
3. **sortOrder is auto-generated**
4. **questionNo is user-provided** (printed book number)
5. **slug, id, and linkage are derived**

---

## ➕ API Usage

```js
import { Tcode } from "./syllabus";

const tcode = new Tcode("fbise9physics");

// Add a Chapter
const ch1 = tcode.addChapter({ name: "Kinematics" });

// Add an Exercise to that Chapter
const ex1 = ch1.addExercise({ name: "Introduction" });

// Add Questions
ex1.addQuestion("md", "Define velocity", 1);
ex1.addQuestion("md", "Give examples of uniform motion", 2, "a", {
  tags: ["motion", "examples"]
});

// Add a second chapter
const ch2 = tcode.addChapter({ name: "Dynamics" });
const ex2 = ch2.addExercise({ name: "Newton's Laws" });

ex2.addQuestion("slide", "State Newton's Second Law", 1);
ex2.addQuestion("md", "Derive F = ma", 2, "", {
  tags: ["derivation", "laws"]
});
```

---

## 🔄 Output API

To export the structured syllabus:

```js
const nested = tcode.getNestedView();
console.log(JSON.stringify(nested, null, 2));
```

You will get:

```js
[
  {
    id: 1,
    name: "Kinematics",
    sortOrder: 1,
    exercises: [
      {
        id: 1,
        name: "Introduction",
        sortOrder: 1,
        questions: [ { ... }, { ... } ]
      }
    ]
  },
  ...
]
```

---

## 🗂 File Structure Model

```sh
syllabus/
├── Tcode.js              # Core class
├── index.js              # API entry
├── enums.js              # Enum definitions
├── builders/
│   ├── chapterBuilder.js
│   └── exerciseBuilder.js
├── models/
│   ├── Chapter.js
│   ├── Exercise.js
│   └── Question.js
├── utils/
│   ├── idGenerator.js
│   ├── slugGenerator.js
│   └── sortManager.js
```

---

## 🧪 Minimal Test

```js
import { Tcode } from "../src/syllabus/index.js";

const tcode = new Tcode("fbise9physics");
const ch = tcode.addChapter({ name: "Kinematics" });
const ex = ch.addExercise({ name: "Intro" });

ex.addQuestion("md", "What is velocity?", 1);
ex.addQuestion("md", "Example of uniform motion", 2, "a", {
  tags: ["examples"]
});

console.log(JSON.stringify(tcode.getNestedView(), null, 2));
```

---

## 🎯 Goal

Make syllabus creation modular, structured, and export-ready. The system is built to scale while maintaining clarity and safety.
