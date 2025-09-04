"use client";

import styles from "./KanjiBack.module.css";
import { KanjiInfo } from "@/types/KanjiInfo";

type KanjiBackProps = {
  kanji: KanjiInfo;
};

export default function KanjiBack({kanji}: KanjiBackProps) {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.kanji}>{kanji.character}</h1>
        <p className={styles.meaning}>{kanji.data.meaning.join(", ")}</p>
      </div>

      <div className={styles.details}>
        <p><b>Onyomi:</b> {kanji.data.onyomi.join(", ")}</p>
        <p><b>Kunyomi:</b> {kanji.data.kunyomi.join(", ")}</p>

        <p><b>Examples:</b></p>
        <ul className="list-disc pl-5">
          {kanji.data.examples.map((ex, i) => (
            <li key={i}>
              <span className="font-bold">{ex.word}</span> – {ex.meaning}
            </li>
          ))}
        </ul>

        <div className={styles.jlpt}>Grade {kanji.data.grade}</div>
      </div>
    </>
  );
}