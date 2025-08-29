import { KanjiInfo } from "@/types/KanjiInfo";

export const mockKanji: KanjiInfo = {
  svgId: "05f8c",
  character: "後",
  meaning: ["after", "back"],
  onyomi: ["ゴ", "コウ"],
  kunyomi: ["のち", "うし", "あと", "おく"],
  examples: [
    { word: "午後", reading: "ごご", meaning: "afternoon, p.m." },
    { word: "最後", reading: "さいご", meaning: "last, ending" },
    { word: "以後", reading: "いご", meaning: "from now on" },
    { word: "後半", reading: "こうはん", meaning: "second half" },
    { word: "後ほど", reading: "のちほど", meaning: "later" },
    { word: "後ろ", reading: "うしろ", meaning: "back, behind" },
    { word: "後で", reading: "あとで", meaning: "later, afterwards" },
    { word: "手後れ", reading: "ておくれ", meaning: "being (too) late" },
    { word: "明後日", reading: "あさって", meaning: "day after tomorrow" },
  ],
  jlpt: 4,
};