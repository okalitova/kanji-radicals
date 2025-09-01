import { KanjiInfo } from "@/types/KanjiInfo";

export const mockKanji: KanjiInfo = {
  svgId: "05f8c",
  character: "後",
  meaning: ["after", "back"],
  onyomi: ["ゴ", "コウ"],
  kunyomi: ["のち", "うし", "あと", "おく"],
  examples: [
    { word: "午後", meaning: "afternoon, p.m." },
    { word: "最後", meaning: "last, ending" },
    { word: "以後", meaning: "from now on" },
    { word: "後半", meaning: "second half" },
    { word: "後ほど", meaning: "later" },
    { word: "後ろ", meaning: "back, behind" },
    { word: "後で", meaning: "later, afterwards" },
    { word: "手後れ", meaning: "being (too) late" },
    { word: "明後日", meaning: "day after tomorrow" },
  ],
  jlpt: 4,
};