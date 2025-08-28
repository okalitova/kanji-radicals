"use client";

import { useState } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";
import KanjiBack from "./KanjiBack";
import RadicalBack from "./RadicalBack";
import { KanjiInfo } from "@/types/KanjiInfo";
import { RadicalInfo } from "@/types/RadicalInfo";

type KanjiCardProps = {
  kanji: KanjiInfo,
  radical: RadicalInfo,
};

export default function KanjiCard({kanji, radical}: KanjiCardProps) {
  const svgSrc = `/kanji/${kanji.character}.svg`;
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
          <RadicalBack radical={radical} />
        </div>
      </div>
    </div>
  );
}
