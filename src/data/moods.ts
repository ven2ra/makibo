import type { Family } from "./products";

export type MoodTone = "lime" | "pink" | "blue" | "yellow" | "wood";
export type Mood = { id: string; label: string; caption: string; family: Family; color: MoodTone; symbol: string; productId?: string };

export const MOODS_KEY = "makibo-moods-v1";
export const DAILY_DROP_KEY = "makibo-daily-drop-v1";
export const defaultMoods: Mood[] = [
  { id: "front-row", label: "ПЕРВЫЙ РЯД", caption: "искристый выход, когда нужно быть замеченным", family: "цитрусовый", color: "lime", symbol: "✦", productId: "dior-sauvage" },
  { id: "after-midnight", label: "ПОСЛЕ ПОЛУНОЧИ", caption: "тёплая близость, кожа, тени и долгий шлейф", family: "восточный", color: "pink", symbol: "◒", productId: "tom-ford-black-orchid" },
  { id: "clean-sheet", label: "ЧИСТЫЙ ЛИСТ", caption: "холодный воздух, прозрачность и перезапуск", family: "водный", color: "blue", symbol: "◌", productId: "byredo-gypsy-water" },
];

export const getStoredMoods = (): Mood[] => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(MOODS_KEY) ?? "null");
    return Array.isArray(saved) && saved.length ? saved as Mood[] : defaultMoods;
  } catch {
    return defaultMoods;
  }
};
