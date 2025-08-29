import {RadicalInfo} from "@/types/RadicalInfo";

export const radicalThread: RadicalInfo = {
  character: "幺",
  meaning: "thread",
  svgId: "05f8c-g4",
  relatedKanji: ["後", "么", "幼"]
};

export const radicalHand: RadicalInfo = {
  character: "夂",
  meaning: "hand",
  svgId: "05f8c-g5",
  relatedKanji: ["後", "冬"]
};

export const radicalGo: RadicalInfo = {
  character: "彳",
  meaning: "step",
  svgId: "05f8c-g1",
  relatedKanji: ["後", "待","往"],
};

export const radicalDB : Record<string, RadicalInfo> = {
    "幺": radicalThread,
    "夂": radicalHand,
    "彳": radicalGo,
}
