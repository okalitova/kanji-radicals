"use client";

import { MiniKanji } from "@/types/MiniKanji";
import styles from "./RadicalBack.module.css";
import { RadicalInfo } from "@/types/RadicalInfo";
import { useEffect, useState } from "react";
import MiniKanjiCard from "./MiniKanjiCard";

type RadicalBackProps = {
  radical: string;
};

export default function RadicalBack({radical}: RadicalBackProps) {
  const [radicalInfo, setRadicalInfo] = useState<RadicalInfo|null>();
  const [relatedKanji, setRelatedKanji] = useState<MiniKanji[]>();

  useEffect(() => {
    const radicalInfo = new RadicalInfo(radical);
    radicalInfo.populateFromIndex().then(() => {
        setRadicalInfo(radicalInfo)
    });
  },[radical]);

  useEffect(() => {
    if (!radicalInfo) return;

    const loadRelatedKanji = async () => {
        const firstKanji = radicalInfo.relatedKanji?.slice(0, 10) ?? [];   
        const miniKanjis = await Promise.all(
            firstKanji.map(async (kanji) => {
                const miniKanji = new MiniKanji(kanji);
                await miniKanji.populateFromIndex(); // assume this returns a Promise
                return miniKanji;
            })
        );
        setRelatedKanji(miniKanjis);
    };

    loadRelatedKanji();
  }, [radicalInfo]);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.radical}>{radicalInfo?.character}</h1>
      </div>
      
      <p><b>Kanji with the radical:</b></p>
      <div className={styles.details}>
            {relatedKanji?.map((kanji, i) => (
                <MiniKanjiCard key={i} radical={radical} svgSrc={`/kanji/${kanji.svgId}.svg`} />
            ))}
      </div>
    </>
  );
}