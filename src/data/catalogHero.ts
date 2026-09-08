// Два флакона в промо-витрине «Выбери свой аромат» на странице каталога.
export const CATALOG_HERO_PICKS_KEY = "makibo-catalog-hero-picks-v1";

export const getStoredCatalogHeroPicks = (): string[] => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CATALOG_HERO_PICKS_KEY) ?? "null");
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string").slice(0, 2) : [];
  } catch {
    return [];
  }
};
