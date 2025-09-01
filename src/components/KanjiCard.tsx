"use client";

import { useState } from "react";
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
      {kanji?
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
          {/* Front: Kanji SVG */}
          <div className={styles.front} onClick={showKanjiBack}>
                <KanjiSVG svgSrc={`/kanji/${kanji.svgId}.svg`} onRadicalClick={showRadicalBack}/>
          </div>

          {/* Back: Meaning */}
          <div className={styles.back} onClick={showFront}>
            {radical ? 
              <RadicalBack radical={radical} /> :
              <KanjiBack kanji={kanji!}/>
            }
          </div>
      </div>
      :<div className={styles.empty}/>
      }
    </div>
  );
}
