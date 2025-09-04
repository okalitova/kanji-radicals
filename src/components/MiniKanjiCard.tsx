"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./MiniKanjiCard.module.css";

type MiniKanjiCardProps = {
  radical: string;
  svgSrc: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function MiniKanjiCard({radical, svgSrc, onClick}: MiniKanjiCardProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);;

  useEffect(() => {
    fetch(`${svgSrc}`)
      .then((res) => {
        if (!res.ok) throw new Error("SVG not found: " + svgSrc);
        return res.text();
      })
      .then((srcText) => toSVG(srcText, radical))
      .then(setSvgContent)
      .catch((err) => console.error(err));
  }, [svgSrc]);

  return (
    <div className={styles.miniKanjiCard} onClick={onClick}>
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

function toSVG(srcText: string, radical: string): string {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(srcText, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg")!;

    svgElement.querySelectorAll('[id^="kvg:StrokeNumbers_"]')
        .forEach((el) => el.remove());

    // Find the radical element and add a class or attribute for styling
    let radicalElement = null;
    const elements = svgElement.querySelectorAll('*');
    for (const el of elements) {
        if (el.getAttribute('kvg:element') === radical) {
            radicalElement = el;
            break;
        }
    }
    if (radicalElement) {
        const strokes = radicalElement.querySelectorAll("path");
        strokes.forEach((stroke) => {
            stroke.setAttribute("stroke", "red");
        });
    }

    return new XMLSerializer().serializeToString(svgElement);
}
