"use client"

import { KanjiInfo } from "@/types/KanjiInfo";
import KanjiCard from "@/components/KanjiCard";
import { mockKanji } from "@/mock/kanji後";
import { useState, useEffect } from "react";

export default function FlashcardsPage() {
  const [kanji, setKanji] = useState('後')
  const [kanjiInfo, setKanjiInfo] = useState<KanjiInfo>(mockKanji);

  useEffect(() => {
    var newKanjiInfo = new KanjiInfo(kanji);
    newKanjiInfo.populateFromKanjiAlive().then(() => {
      setKanjiInfo(newKanjiInfo)
      console.log(newKanjiInfo)
    });
  }, [kanji])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Kanji Flashcards</h1>
      <div className="flex items-center space-x-4">
          <KanjiCard kanji={kanjiInfo}/>

          {/* Next button */}
          <button
            // onClick={loadNextKanji} // your handler
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
