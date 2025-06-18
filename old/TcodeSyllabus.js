// TcodeSyllabus.js
import { Chapter } from "./chapter.js";

export default class TcodeSyllabus {
  constructor(tcodeName = "defaultName") {
    this.tcodeName = tcodeName;
    this.description = "";
    this.image = "";
    this.link = "";
    this.chapters = [];
  }

  addChapter(title, description = "") {
    const id = this.chapters.length + 1;
    const chapter = new Chapter(id, title, description, this.tcodeName);
    this.chapters.push(chapter);
    return chapter;
  }

  toJSON() {
    return {
      tcodeName: this.tcodeName,
      description: this.description,
      image: this.image,
      link: this.link,
      chapters: this.chapters.map(ch => ch.toJSON())
    };
  }
}
