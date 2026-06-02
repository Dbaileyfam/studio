export const NOTE_SYMBOLS = ["♪", "♫", "♬", "♩"] as const;
export const NOTE_COLORS = [
  "#5eead4",
  "#2dd4bf",
  "#fbbf24",
  "#f59e0b",
  "#fde68a",
] as const;

export const randomNoteSymbol = () =>
  NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)] ?? "♪";

export const randomNoteColor = () =>
  NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)] ?? "#2dd4bf";
