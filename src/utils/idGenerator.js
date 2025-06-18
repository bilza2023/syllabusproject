// utils/idGenerator.js

let chapterCounter = 1;
let exerciseCounter = 1;

export function generateUUID() {
  // Simple RFC4122 v4-like UUID generator (not crypto-secure)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getNextChapterId() {
  return chapterCounter++;
}

export function getNextExerciseId() {
  return exerciseCounter++;
}
