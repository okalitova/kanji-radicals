"use client";

import { useState } from "react";
import styles from "./KanjiCard.module.css";
import KanjiSVG from "./KanjiSVG";
import CardBack from "./CardBack";
import { mockKanji } from "@/mock/kanji後";

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
          <CardBack kanji={mockKanji} />
        </div>
      </div>
    </div>
  );
}
