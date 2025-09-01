"use client";

import styles from "./RadicalBack.module.css";
import { RadicalInfo } from "@/types/RadicalInfo";
import { useEffect, useState } from "react";

type RadicalBackProps = {
  radical: string;
};

export default function RadicalBack({radical}: RadicalBackProps) {
  const [radicalInfo, setRadicalInfo] = useState<RadicalInfo|null>();
  useEffect(() => {
    const radicalInfo = new RadicalInfo(radical);
    radicalInfo.populateFromIndex().then(() => {
        setRadicalInfo(radicalInfo)
    });
  },[radical]);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.radical}>{radicalInfo?.character}</h1>
      </div>

      <div className={styles.details}>
        <p><b>Kanji with the radical:</b></p>
          {radicalInfo?.relatedKanji?.join(", ")}
      </div>
    </>
  );
}