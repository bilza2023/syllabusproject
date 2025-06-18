// exercise.js
import { Question } from "./question.js";
import { SyllabusBase } from "./SyllabusBase.js";

export class Exercise extends SyllabusBase {
  constructor(exercise, tcodeName, chapter) {
    super({
      name: `Exercise ${exercise}`,
      description: "",
      image: "/tcodes/exercise-banner.webp",
      color: "#4b2e83",
      tag: `Exercise ${exercise}`
    });

    this.exercise = exercise;
    this.chapterId = chapter.id;
    this.tcodeName = tcodeName;
    this.questions = [];
  }

  addQ(questionType, questionNo, questionName=null , questionPart = "") {
    const q = new Question(this.tcodeName, this.chapterId, this.exercise, questionNo, questionType, questionPart);
    if(questionName) q.questionName = questionName;
    this.questions.push(q);
    return this;
  }

  toJSON() {
    return {
      exerciseName: this.exercise,
      questions: this.questions.map(q => ({
        ...q,
        tcodeUrl: q.tcodeUrl()
      }))
    };
  }
}
