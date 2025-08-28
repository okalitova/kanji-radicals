"use client";

import styles from "./RadicalBack.module.css";
import { RadicalInfo } from "@/types/RadicalInfo";

type RadicalBackProps = {
  radical: RadicalInfo;
};

export default function RadicalBack({radical}: RadicalBackProps) {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.radical}>{radical.character}</h1>
        <p className={styles.meaning}>{radical.meaning}</p>
      </div>

      <div className={styles.details}>
        <p><b>Examples:</b></p>
        <ul className="list-disc pl-5">
          {radical.relatedKanji?.map((ex, i) => (
            <li key={i}>
              <span className="font-bold">{ex}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}