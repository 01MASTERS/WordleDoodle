import { COMMON_WORDS } from "./wordList";

export function isValidWord(word: string): boolean {
  if (word.length < 3) return false;
  return COMMON_WORDS.has(word.toUpperCase()); 
}
