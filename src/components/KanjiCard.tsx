"use client";

import { useEffect, useState } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";
import KanjiBack from "./KanjiBack";
import RadicalBack from "./RadicalBack";
import { KanjiInfo } from "@/types/KanjiInfo";
import { RadicalInfo } from "@/types/RadicalInfo";
import { radicalDB } from "@/mock/radicals";


type KanjiCardProps = {
  kanji: KanjiInfo,
};

export default function KanjiCard({kanji}: KanjiCardProps) {
  const svgSrc = `/kanji/${kanji.character}.svg`;
  const connectedRadicals = radicalDB;
  const [flipped, setFlipped] = useState(false);
  const [radical, setRadical] = useState<string>();

  const onRadicalClicked = (radicalName: string) => {
    setRadical(radicalName);
    flipCard();
  };

  const flipCard = () => {
    // Clean up to the initial state when flipping back.
    if (flipped && radical) {
      setRadical("");
    }
    setFlipped(!flipped);
  }

  return (
    <div
      className={`${styles.card}`}
      onClick={flipCard}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        {/* Front: Kanji SVG */}
        <div className={styles.front}>
            <KanjiSVG svgSrc={svgSrc} onRadicalClick={onRadicalClicked}/>
        </div>

        {/* Back: Meaning */}
        <div className={styles.back}>
          {radical ? 
            <RadicalBack radical={radicalDB[radical!]} /> :
            <KanjiBack kanji={kanji}/>
          }
        </div>
      </div>
    </div>
  );
}
