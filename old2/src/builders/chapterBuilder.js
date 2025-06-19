
addExercise({ name, description = "", slug }) {
  if (!slug) throw new Error(`Exercise "${name || '[unknown]'}" must have a slug`);


  const id = getNextExerciseId();

  const exercise = createExercise({
    id,
    name,
    slug,
    chapterId: rawChapter.id,
    description,
    existingExercises: tcodeRef.exercises
  });

  tcodeRef.exercises.push(exercise);
  return createExerciseWrapper(exercise, tcodeRef);
}
