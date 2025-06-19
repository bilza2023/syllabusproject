
// subjectBuilder.js

import { validateFilename, validateNoDuplicateQuestion } from "./validate.js";

export class SubjectBuilder {
  constructor({ tcodeName, filename, description, image, chapters }) {
    this.tcodeName = tcodeName;
    this.filename = filename;
    this.description = description;
    this.image = image;
    this.chapters = chapters;// actual data is in this.questions -these are as reference
    this.questions = [];

    // Validate all filenames at creation
    validateFilename(this.filename);
    this._chapterMap = new Map();
    for (const chapter of this.chapters) {
      validateFilename(chapter.filename);
      const exMap = new Map();
      for (const exercise of chapter.exercises) {
        validateFilename(exercise.filename);
        exMap.set(exercise.filename, exercise);
      }
      this._chapterMap.set(chapter.filename, exMap);
    }
  }

  getChExByFilename(chapterFilename, exerciseFilename) {
    const chapterMap = this._chapterMap.get(chapterFilename);
    if (!chapterMap) throw new Error(`Chapter not found: ${chapterFilename}`);
    const exercise = chapterMap.get(exerciseFilename);
    if (!exercise) throw new Error(`Exercise not found: ${exerciseFilename}`);

    return {
      addQuestion: (q) => {
        validateFilename(q.filename);
        validateNoDuplicateQuestion(this.questions, q);
        this.questions.push({
          ...q,
          chapterFilename,
          exerciseFilename
        });
      }
    };
  }

  bulkAddQuestions(entries) {
    for (const { chapter, exercise, question } of entries) {
      this.getChExByFilename(chapter, exercise).addQuestion(question);
    }
  }

  toJSON() {
    return {
      tcodeName: this.tcodeName,
      filename: this.filename,
      description: this.description,
      image: this.image,
      chapters: this.chapters,
      questions: this.questions
    };
  }
}