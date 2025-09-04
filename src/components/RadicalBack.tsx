"use client";

import styles from "./RadicalBack.module.css";
import { RadicalInfo } from "@/types/RadicalInfo";
import { useEffect, useState } from "react";
import MiniKanjiCard from "./MiniKanjiCard";
import { KanjiInfo } from "@/types/KanjiInfo";

type RadicalBackProps = {
  radical: string;
  handleKanjiChange: (kanji: string) => void;
};

export default function RadicalBack({radical, handleKanjiChange}: RadicalBackProps) {
  const [radicalInfo, setRadicalInfo] = useState<RadicalInfo|null>();
  const [relatedKanji, setRelatedKanji] = useState<KanjiInfo[]>();

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
                const miniKanji = new KanjiInfo(kanji);
                await miniKanji.fetch(); // assume this returns a Promise
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
                <MiniKanjiCard
                    key={i}
                    radical={radical}
                    svgSrc={`/kanji/${kanji.svgId}.svg`}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        e.stopPropagation();
                        handleKanjiChange(kanji.character);
                    }}
                />
            ))}
      </div>
    </>
  );
}