"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./KanjiSVG.module.css";

type KanjiSVGProps = {
  svgSrc: string;
  onRadicalClick: (radical: string) => void;
};

export default function KanjiSVG({svgSrc, onRadicalClick}: KanjiSVGProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
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

  // Adding the listener for clicks on radicals.
  useEffect(() => {
    if (!containerRef.current) return;

    // One needs to get the kanji first, cause kanji itself is a `g[kvg:element]`.
    const kanji = containerRef.current.querySelector("g")?.querySelector("g");

    // Every radical that is not a descendant of another radical.
    const radicals = kanji?.querySelectorAll("g[kvg\\:element]:not(:scope g[kvg\\:element] g[kvg\\:element])")!;

    // Stable click handler for adding/removal.
    const handleClick = (event: Event) => {
      const radical = event.currentTarget as SVGElement;
      console.log(styles.radicalPressed);
      console.log(radical.classList);
      radical.classList.add(styles.radicalPressed);
      console.log(radical.classList);
      const radicalName = radical.getAttribute("kvg:element");
      if (radicalName) {
        onRadicalClick?.(radicalName);
      }
    };

    radicals.forEach((radical) => radical.addEventListener("click", handleClick));

    return () => {
      radicals.forEach((radical) => {
        radical.removeEventListener("click", handleClick);
      });
    };
  }, [svgContent, onRadicalClick]);

  return (
    svgContent ? (
        <div 
            className={styles.kanji}
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
    ) : ("Loading...")
  );
}

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
