export interface KanjiInfo {
  character: string;
  meaning: string[];
  onyomi: string[];
  kunyomi: string[];
  examples: { word: string; reading: string; meaning: string }[];
  jlpt: number;
}