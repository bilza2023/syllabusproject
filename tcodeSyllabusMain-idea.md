# SyllabusObject.md

## 🧩 Overview

The `SyllabusObject` defines a fully flat, reference-based model for building structured educational syllabi. It stores all chapters, exercises, and questions as flat arrays inside a single root object. There is **no nesting** — all relationships are maintained via IDs. The goal is to create a stable, scalable, and easily queryable anchor system for attaching educational content.

---

## 🧱 Core Structure

### Root Object: `tcode`

```js
{
  chapters: [ Chapter ],
  exercises: [ Exercise ],
  questions: [ Question ],
  enums: {
    questionTypes: ["video", "md", "eq"],
    // add more enums as needed
  }
}
```

---

## 🗂 Data Models

### 1. Chapter

```js
{
  id: Number,
  name: String,
  description: String (optional),
  sortOrder: Number
}
```

### 2. Exercise

```js
{
  id: Number,
  name: String,
  chapterId: Number,
  description: String (optional),
  sortOrder: Number
}
```

### 3. Question

```js
{
  id: String (UUID),
  chapterId: Number,
  exerciseId: Number,
  type: String (must match enums.questionTypes),
  sortOrder: Number,
  name: String,
  tags: [String],
  questionPart: String (optional),
  slug: String (e.g. "fbise9physics:2:forces:3a"),
  tcodeName: String
}
```

---

## ✅ Core Principles

1. **Flat Storage:** No object nesting. All relationships via ID.
2. **Scoped Insertion Only:** You may only insert exercises via returned `chapter.addExercise()` and questions via `exercise.addQuestion()`.
3. **Validation:** All references (e.g. chapterId) must exist at time of insertion.
4. **Export Structure:** Nested views for frontend are computed, not stored.
5. **UUID + Slug:** Each question is globally anchored via UUID and structured key.
6. **Auto-Sorting:** \`sortO

---

## 🔁 Returned Objects: Scoped Inserters

### 🔹 `tcode.addChapter({ name })` → returns:

```js
{
  id: Number,
  name: String,
  description?: String,
  sortOrder: Number,
  addExercise: Function    // scoped to this chapter
}
```

---

### 🔹 `chapter.addExercise({ name })` → returns:

```js
{
  id: Number,
  name: String,
  chapterId: Number,
  description?: String,
  sortOrder: Number,
  addQuestion: Function    // scoped to this exercise
}
```

---

### 🔹 `exercise.addQuestion(...)` → returns:

The created question object:

```js
{
  id: UUID,
  chapterId: Number,
  exerciseId: Number,
  type: String,
  sortOrder: Number,
  name: String,
  tags?: [String],
  questionPart?: String,
  slug: String,
  tcodeName: String
}
```
