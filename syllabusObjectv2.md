Here's your **brutally clean and finalized rewrite** of `syllabusObjectv2.md`, combining **what we are doing** and **how we are doing it**, with all outdated parts removed, and latest decisions included.

---

# 📘 SyllabusObject v2 — Final Architecture & Execution Spec

---

## 🔺 Immutable Trinity: `filename` at Every Level

At the core of this system is a contract of stability:

> Every `Chapter`, `Exercise`, and `Question` must have a **`filename`** — a permanent, file-safe identifier.

### 🔒 Purpose of `filename`:

* Not for display
* Not for URLs
* **Only** for locating linked files on disk or in a database

If a `filename` is not safe for filesystem or URLs → **panic immediately**.
No silent fixes. No fallback logic. No slugification.

| Node     | `filename` Example | Use Case                     |
| -------- | ------------------ | ---------------------------- |
| Chapter  | `ch1_motion`       | File prefix / content anchor |
| Exercise | `ex1_intro`        | File prefix / sub-anchor     |
| Question | `q001_velocity`    | Final file name (e.g. `.md`) |

---

## 🗃 Flat File Structure Per Tcode

All questions are stored in:

```
/syllabus/{tcode}/
```

Each file uses:

```
{chapter.filename}_{exercise.filename}_{question.filename}.md
```

### ✅ Why Flat?

I. **DB-Ready** — maps directly to SQL, Mongo, or key-value stores
II. **AI-Friendly** — no folder recursion; batchable
III. **Safe for Git/S3** — no nested sync traps
IV. **Deterministic** — filenames are always stable and direct

---

## 🌲 Folder Tree Structure? **Rejected**

Tree structure (chapter/exercise/question folders) is not used because:

* Hard to traverse at scale
* Poor for AI-driven or Git-based tooling
* Flat paths outperform folders in all automation scenarios

---

## 🧠 Determinism vs Dynamic URLs

We do **not** generate URLs from live properties like chapter ID, question number, etc.
Instead:

> **Generate each filename once, and only once. Store it. Use it forever.**

This avoids:

* Link drift on re-runs
* Broken references from renaming
* Cost of recalculating millions of keys

---

## ✅ How the System Works (Builder Pattern)

---

### 1. `createTcode({ ... })`

Defines the root tcode and its static structure.

* Requires: `tcodeName`, `filename`, `description`, `image`
* Must include full list of `chapters[]` and nested `exercises[]`
* Each node must have a valid `filename`

Once created, the structure is **frozen** — no dynamic `.addChapter()` or `.addEx()` allowed.

---

### 2. `tcode.getChExByFilename(chapterFilename, exerciseFilename)`

Returns a **locked context** for adding questions.

* Validates the chapter and exercise exist
* Returns a safe handler:

  ```js
  const ctx = tcode.getChExByFilename("ch1_motion", "ex1_intro");
  ctx.addQuestion({ filename, name, type, ... });
  ```

---

### 3. `ctx.addQuestion({...})`

* Adds a question to the correct chapter + exercise context
* Fails loudly if:

  * Duplicate `question.filename`
  * Invalid structure
  * Missing fields

---

### 4. `tcode.toJSON()`

Outputs the **final static JSON** structure.

* This is what gets:

  * Saved to disk
  * Imported in Svelte apps
  * Used for AI/file linking

Svelte and DB never use the builder directly — only the `.toJSON()` output.

---

## ✅ Optional Bulk Entry API

For full automation:

```js
tcode.bulkAddQuestions([
  {
    chapter: "ch1_motion",
    exercise: "ex1_intro",
    question: { filename: "q001_velocity", name: "...", type: "md" }
  },
  ...
])
```

---

## 🔒 Final Contract

1. All filenames must be declared up front. No fallback logic.
2. Structure is declared once. No mutations after creation.
3. All questions must be added via `getChExByFilename(...)`
4. `tcode.toJSON()` is the only valid output.
5. If any `filename` is invalid → **throw and halt immediately**.

---

✅ With this contract, you now have:

* A deterministic, content-safe, AI-compatible, DB-portable syllabus system
* Designed for 1 million files, not 1 school

Let me know and I’ll save this updated version to `syllabusObjectv2.md`.
