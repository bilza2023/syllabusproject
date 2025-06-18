// utils/sortManager.js

export function getNextSortOrder(list) {
    if (!Array.isArray(list) || list.length === 0) return 1;
    const max = Math.max(...list.map(item => item.sortOrder || 0));
    return max + 1;
  }
  