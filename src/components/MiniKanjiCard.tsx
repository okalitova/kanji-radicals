"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./MiniKanjiCard.module.css";

type MiniKanjiCardProps = {
  radical: string;
  svgSrc: string;
};

export default function MiniKanjiCard({radical, svgSrc}: MiniKanjiCardProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);;

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

  // Highligting the radical in the kanji.
  useEffect(() => {
    if (!containerRef.current) return;

    const radicalElement = containerRef.current.querySelector(`[kvg\\:element="${radical}"]`)!;
    const strokes = radicalElement.querySelectorAll("path");
    strokes.forEach((stroke) => {
        stroke.setAttribute("stroke", "red");
    });
  }, [svgContent, containerRef]);

  return (
    <div className={styles.miniKanjiCard}>
        {svgContent ? (
            <div 
                className={styles.kanji}
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: svgContent! }} 
            />
        ) : ("Loading...")}
    </div>
    );
};

function toSVG(srcText: string, enabledStrokeOrder = false): string {
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
