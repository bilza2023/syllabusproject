// models/Question.js

import { generateSlug, generateTcodeUrl } from "../utils/slugGenerator.js";
import { generateUUID } from "../utils/idGenerator.js";

export function createQuestion({
  name,
  type,
  chapterId,
  exerciseId,
  questionNo,            // manually provided (book reference)
  questionPart = "",     // optional
  tags = [],
  exerciseName,
  tcodeName,
  existingQuestions = []
}) {
  const sortOrder = existingQuestions.filter(q => q.exerciseId === exerciseId).length + 1;
  const id = generateUUID();

  return {
    id,
    chapterId,
    exerciseId,
    type,
    sortOrder,                 // for internal UI/rendering
    questionNo,                // for matching printed syllabus
    name,
    tags,
    questionPart,
    slug: generateSlug({ tcodeName, chapterId, exerciseName, questionNo, questionPart }),
    tcodeName
  };
}
