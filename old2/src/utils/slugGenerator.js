// utils/slugGenerator.js

export function generateSlug({ tcodeName, chapterId, exerciseName, questionNo, questionPart = "" }) {
    const safeExercise = exerciseName.replace(/[ .]/g, "_").toLowerCase();
    const suffix = questionPart ? `${questionNo}${questionPart}` : `${questionNo}`;
    return `${tcodeName}:${chapterId}:${safeExercise}:${suffix}`;
  }
  
  export function generateTcodeUrl({ tcodeName, chapterId, exerciseName, questionNo, questionPart = "" }) {
    const safeExercise = exerciseName.replace(/[ .]/g, "_").toLowerCase();
    const suffix = questionPart ? `${questionNo}${questionPart}` : `${questionNo}`;
    return `filename=${tcodeName}-chapter-${chapterId}-ex${safeExercise}-q${suffix}`;
  }
  