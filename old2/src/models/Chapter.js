
export function createChapter({ id, name, description = "", slug, existingChapters = [] }) {
  if (!slug) throw new Error(`Missing slug for chapter "${name}"`);

  const sortOrder = existingChapters.length + 1;

  return {
    id,
    name,
    description,
    slug,             // REQUIRED
    sortOrder,
    image: "pivot/box.webp",
    link: "/",
  };
}
