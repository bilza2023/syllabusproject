

export function createExercise({ id, name, chapterId, description = "", slug, existingExercises = [] }) {
  if (!slug) throw new Error(`Missing slug for exercise "${name}" in chapter ID ${chapterId}`);

  const sortOrder = existingExercises.filter(ex => ex.chapterId === chapterId).length + 1;

  return {
    id,
    name,
    chapterId,
    description,
    slug,             // REQUIRED
    sortOrder,
    image,
    link
  };
}
