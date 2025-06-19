
import { getNextChapterId } from "./utils/idGenerator.js";
import { createChapter } from "./models/Chapter.js";
import { createChapterWrapper } from "./builders/chapterBuilder.js";
import { questionTypes } from "./enums.js";

export default class Tcode {
  constructor(tcodeName) {
    this.tcodeName = tcodeName;
    this.chapters = [];
    this.exercises = [];
    this.questions = [];

    this.enums = {
      questionTypes
    };
  }

  addChapter({ name, description = "" }) {
    const id = getNextChapterId();
    const chapter = createChapter({
      id,
      name,
      description,
      image : "pivot/box.webp",
      link : "/",
      existingChapters: this.chapters
    });

    this.chapters.push(chapter);
    return createChapterWrapper(chapter, this);
  }

  // Optional export: grouped by chapter → exercises → questions
  getNestedView() {
    return this.chapters.map(ch => {
      const exercises = this.exercises
        .filter(ex => ex.chapterId === ch.id)
        .map(ex => {
          const questions = this.questions.filter(q => q.exerciseId === ex.id);
          return { ...ex, questions };
        });
      return { ...ch, exercises };
    });
  }

  // Optional helper lookups
  getChapterIdByName(name) {
    const found = this.chapters.find(c => c.name === name);
    return found?.id ?? null;
  }

  getExerciseIdByName(name) {
    const found = this.exercises.find(e => e.name === name);
    return found?.id ?? null;
  }
}
