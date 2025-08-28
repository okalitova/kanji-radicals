"use client";

import { useEffect, useState } from "react";
import styles from "./KanjiSVG.module.css";

type KanjiSVGProps = {
  svgSrc: string;
};

export default function KanjiSVG({svgSrc }: KanjiSVGProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${svgSrc}`)
      .then((res) => {
        if (!res.ok) throw new Error("SVG not found: " + svgSrc);
        return res.text();
      })
      .then(toSVG)
      .then(setSvgContent)
      .catch((err) => console.error(err));
  }, [svgSrc]);

  return (
    svgContent ? (
        <div 
            className={styles.kanji}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
    ) : ("Loading...")
  );
}

function toSVG(srcText: string, enabledStrokeOrder = true): string {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(srcText, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg")!;

    // TODO: Handle the stroke order toggle via a prop and classes.
    if (!enabledStrokeOrder) {
        svgElement.querySelectorAll('[id^="kvg:StrokeNumbers_"]')
            .forEach((el) => el.remove());
    }

    return new XMLSerializer().serializeToString(svgElement);
}
