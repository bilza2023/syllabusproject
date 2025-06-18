// chapter.js
import { Exercise } from "./exercise.js";
import { SyllabusBase } from "./SyllabusBase.js";

export class Chapter extends SyllabusBase {
  constructor(id, title, description, tcodeName) {
    super({
      name: title,
      description,
      image: "/tcodes/chapter-banner.webp",
      color: "#2c3e50",
      tag: `Chapter ${id}`
    });

    this.id = id;
    this.tcodeName = tcodeName;
    this.exercises = [];
  }

  addEx(name) {
    const safeName = name.replace(/[ .]/g, "_").toLowerCase();
    const existing = this.exercises.find(ex => ex.exercise === safeName);
    if (existing) return existing;

    const ex = new Exercise(safeName, this.tcodeName, this);
    this.exercises.push(ex);
    return ex;
  }

  toJSON() {
    return {
      id: this.id,
      chapterName: this.name,
      description: this.description,
      image: this.image,
      exercises: this.exercises.map(ex => ex.toJSON())
    };
  }
}
