"use client"

import { KanjiInfo } from "@/types/KanjiInfo";
import KanjiCard from "@/components/KanjiCard";
import { useState, useEffect } from "react";

const mockAlgo: string[] = [
  "会","同","事","自","社","者","地","方","法","度",
  "者","意","動","新","問","体","学","所","作","発",
  "用","事","民","力","思","場","目","長","行","部",
  "心","手","知","力","話","通","場","書","持","計",
  "聞","気","言","立","国","親","方","頭","口","出",
  "友","働","読","書","数","名","形","道","思","買",
  "食","歩","思","電","車","会","帰","聞","歩","持",
  "走","住","買","聞","話","思","食","書","読","作",
  "力","方","目","立","音","明","友","店","社","心",
  "手","見","火","水","木","金","土","曜","年","月",
  "日","今","先","週","毎","時","分","半","間","午"
];

export default function FlashcardsPage() {
  const [i, setI] = useState(0);
  const [kanji, setKanji] = useState('会');
  const [kanjiInfo, setKanjiInfo] = useState<KanjiInfo|null>(null);

  useEffect(() => {
    async function fetchKanjiInfo() {
      const newKanjiInfo = new KanjiInfo(kanji);
      await newKanjiInfo.populateFromKanjiAlive();
      await newKanjiInfo.populateFromIndex();

      setKanjiInfo(newKanjiInfo);
    }
    
    fetchKanjiInfo();
  }, [kanji]);

  const loadNextKanji = () => {
    setI((i + 1) % 100);
    setKanji(mockAlgo[i]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Kanji Flashcards</h1>
      <div className="flex items-center space-x-4">
          <KanjiCard kanji={kanjiInfo}/>

          {/* Next button */}
          <button
            onClick={loadNextKanji} // your handler
            className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
            aria-label="Next Kanji"
          >
            {/* Right arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </div>
    </div>
  );
}
