"use client";

import { useState } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";

type KanjiCardProps = {
  kanji: string;
  meaning: string;
  svgSrc: string;
};

export default function KanjiCard({ kanji, meaning, svgSrc }: KanjiCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.card}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        {/* Front: Kanji SVG */}
        <div className={styles.front}>
            <KanjiSVG svgSrc={svgSrc} />
        </div>

        {/* Back: Meaning */}
        <div className={styles.back}>
          <div className="text-center">
            <p className="text-2xl font-bold">{kanji}</p>
            <p className="mt-2 text-lg">{meaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
