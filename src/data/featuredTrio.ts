// Редакционный выбор для блока «Три флакона, которые нельзя пропустить».
// Хранится отдельно от Hit Parade: это самостоятельная витрина на главной.
export const FEATURED_TRIO_KEY = "makibo-featured-trio-v1";

export const getStoredFeaturedTrio = (): string[] => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(FEATURED_TRIO_KEY) ?? "null");
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string").slice(0, 3) : [];
  } catch {
    return [];
  }
};
