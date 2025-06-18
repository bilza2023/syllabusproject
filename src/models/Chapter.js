// models/Chapter.js

export function createChapter({ id, name, description = "", existingChapters = [] }) {
    const sortOrder = existingChapters.length + 1;
  
    return {
      id,
      name,
      description,
      sortOrder
    };
  }
  