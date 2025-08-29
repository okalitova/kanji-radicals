"use client";

import { useState } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";
import KanjiBack from "./KanjiBack";
import RadicalBack from "./RadicalBack";
import { KanjiInfo } from "@/types/KanjiInfo";
import { radicalDB } from "@/mock/radicals";


type KanjiCardProps = {
  kanji: KanjiInfo,
};

export default function KanjiCard({kanji}: KanjiCardProps) {
  const svgSrc = `/kanji/${kanji.character}.svg`;
  const connectedRadicals = radicalDB;
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
  }

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        {/* Front: Kanji SVG */}
        <div className={styles.front} onClick={showKanjiBack}>
            <KanjiSVG svgSrc={svgSrc} onRadicalClick={showRadicalBack}/>
        </div>

        {/* Back: Meaning */}
        <div className={styles.back} onClick={showFront}>
          {radical ? 
            <RadicalBack radical={radicalDB[radical!]} /> :
            <KanjiBack kanji={kanji}/>
          }
        </div>
      </div>
    </div>
  );
}
