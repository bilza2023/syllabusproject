

// builders/exerciseBuilder.js

import { createQuestion } from "../models/Question.js";

export function createExerciseWrapper(rawExercise, tcodeRef) {
  return {
    ...rawExercise,

    addQuestion(type, name, questionNo, questionPart = "", { tags = [] } = {}) {
      const exerciseName = rawExercise.name;
      const chapterId = rawExercise.chapterId;
      const exerciseId = rawExercise.id;
      const tcodeName = tcodeRef.tcodeName;

      const question = createQuestion({
        name,
        type,
        questionNo,
        questionPart,
        tags,
        chapterId,
        exerciseId,
        exerciseName,
        tcodeName,
        existingQuestions: tcodeRef.questions
      });

      tcodeRef.questions.push(question);

      return question;
    }
  };
}
