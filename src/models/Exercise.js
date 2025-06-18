
// models/Exercise.js

export function createExercise({ id, name, chapterId, description = "", existingExercises = [] }) {
    const sortOrder = existingExercises.filter(ex => ex.chapterId === chapterId).length + 1;
  
    return {
      id,
      name,
      chapterId,
      description,
      sortOrder
    };
  }
  