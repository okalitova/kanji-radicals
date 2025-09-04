"use client";

import { useState, useEffect } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";
import KanjiBack from "./KanjiBack";
import RadicalBack from "./RadicalBack";
import { KanjiInfo } from "@/types/KanjiInfo";


type KanjiCardProps = {
  kanji: KanjiInfo | null,
};

export default function KanjiCard({kanji}: KanjiCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [radical, setRadical] = useState<string>();
  const [currentKanji, setCurrentKanji] = useState<KanjiInfo>();

  useEffect(() => { if (kanji) setCurrentKanji(kanji); }, [kanji]);

  // Updates the kanji currently displayed on this card without creating a new card.
  // Unlike switching to a completely new card, the card component stays mounted.
  // This is used in "kanji exploration" mode, e.g., when:
  //   1. The user clicks a radical on the front of the card.
  //   2. The related kanji are shown on the back.
  //   3. The user selects one of those kanji to view.
  // `currentKanji` is updated with the selected kanji, while `kanji` remains the original read-only prop.
  const setNewKanji = async (newKanji: KanjiInfo) => {
    setCurrentKanji(newKanji);
    showFront();
  };

  const showRadicalBack = (radicalName: string) => {
    setRadical(radicalName);
    setFlipped(true);
  };

  const showKanjiBack = () => {
    setRadical("");
    setFlipped(true);
  };

  const showFront = () => {
    setFlipped(false);
  };

  return (
    <div className={`${styles.card}`}>
      {currentKanji?
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
          {/* Front: Kanji SVG */}
          <div className={styles.front} onClick={showKanjiBack}>
                <KanjiSVG svgSrc={`/kanji/${currentKanji.svgId}.svg`} onRadicalClick={showRadicalBack}/>
          </div>

          {/* Back: Meaning */}
          <div className={styles.back} onClick={showFront}>
            {radical ? 
              <RadicalBack radical={radical} handleKanjiChange={setNewKanji} /> :
              <KanjiBack kanji={currentKanji!}/>
            }
          </div>
      </div>
      :<div className={styles.empty}/>
      }
    </div>
  );
}
