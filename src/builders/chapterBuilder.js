
// builders/chapterBuilder.js

import { getNextExerciseId } from "../utils/idGenerator.js";
import { createExercise } from "../models/Exercise.js";
import { createExerciseWrapper } from "./exerciseBuilder.js";

export function createChapterWrapper(rawChapter, tcodeRef) {
  return {
    ...rawChapter,

    addExercise({ name, description = "" }) {
      const id = getNextExerciseId();

      const exercise = createExercise({
        id,
        name,
        chapterId: rawChapter.id,
        description,
        existingExercises: tcodeRef.exercises
      });

      tcodeRef.exercises.push(exercise);

      return createExerciseWrapper(exercise, tcodeRef);
    }
  };
}
