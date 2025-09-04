"use client"

import { KanjiInfo } from "@/types/KanjiInfo";
import KanjiCard from "@/components/KanjiCard";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

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
  const [nextkanjiInfo, setNextKanjiInfo] = useState<KanjiInfo|null>(null);
  const [didDrag, setDidDrag] = useState(false);
  const controls = useAnimation();

  const getNextIndex = () => {return (i + 1) % mockAlgo.length;}

  useEffect(() => {
    async function fetchKanjiInfo() {
      if (nextkanjiInfo) {
        setKanjiInfo(nextkanjiInfo);
      } else {
        const newKanjiInfo = new KanjiInfo(kanji);
        await newKanjiInfo.populateFromKanjiAlive();
        await newKanjiInfo.populateFromIndex();
        setKanjiInfo(newKanjiInfo);
      }

      // Preload the next kanji;
      const nextIndex = getNextIndex();
      const upcomingKanji = mockAlgo[nextIndex];
      const preloadInfo = new KanjiInfo(upcomingKanji);
      preloadInfo.populateFromKanjiAlive();
      preloadInfo.populateFromIndex();
      setNextKanjiInfo(preloadInfo);

      console.log('Current kanji: ', kanji);
      console.log('Upcoming kanji: ', upcomingKanji);
    }
    fetchKanjiInfo();
  }, [kanji]);

  const loadNextKanji = () => {
    setKanjiInfo(null);

    const nextIndex = getNextIndex();
    setI(nextIndex);
    setKanji(mockAlgo[nextIndex]);
    setKanjiInfo(nextkanjiInfo);
    setNextKanjiInfo(null);
  };

  const handleDragStart = () => {
    setDidDrag(false);
  };

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x; // horizontal movement
    const velocity = info.velocity.x;

    // swipe threshold
    if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
      setDidDrag(true);
      // animate off screen
      await controls.start({ x: offset > 0 ? 500 : -500, opacity: 0 });

      // reset card in center
      loadNextKanji();
      controls.set({ x: 0, opacity: 1 });
    } else {
      // snap back to center if not swiped enough
      controls.start({ x: 0 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Kanji Flashcards</h1>
      <div className="flex items-center space-x-4">
          <motion.div
            key={kanji}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            // className="cursor-grab active:cursor-grabbing"
            onClickCapture={(e) => {
              if (didDrag) {
                e.stopPropagation(); // prevent KanjiCard onClick
                e.preventDefault();
                setDidDrag(false);   // reset
              }
            }}
          >
            <KanjiCard kanji={kanjiInfo} />
          </motion.div>
      </div>
    </div>
  );
}
