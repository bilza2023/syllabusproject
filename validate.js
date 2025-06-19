// validate.js

const unsafeFilenameRegex = /[^a-zA-Z0-9_\-]/;

export function validateFilename(str) {
  if (!str || typeof str !== "string") {
    throw new Error(`Invalid filename: must be non-empty string`);
  }
  if (unsafeFilenameRegex.test(str)) {
    throw new Error(`Invalid filename '${str}': only letters, numbers, underscores, and hyphens allowed`);
  }
}

export function validateNoDuplicateQuestion(existingQuestions, newQuestion) {
  const exists = existingQuestions.some(
    (q) => q.filename === newQuestion.filename &&
           q.chapterFilename === newQuestion.chapterFilename &&
           q.exerciseFilename === newQuestion.exerciseFilename
  );
  if (exists) {
    throw new Error(`Duplicate question filename '${newQuestion.filename}' in context ${newQuestion.chapterFilename}/${newQuestion.exerciseFilename}`);
  }
}
