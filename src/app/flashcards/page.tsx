import KanjiCard from "./components/KanjiCard";

type FlashcardData = {
  kanji: string;
  meaning: string;
  svgSrc: string;
};

const flashcardsData: FlashcardData[] = [
  { kanji: "後", meaning: "After", svgSrc: "/kanji/後.svg" },
];

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Kanji Flashcards</h1>
      <div className="flex">
        {flashcardsData.map((card) => (
          <KanjiCard
            key={card.kanji}
            kanji={card.kanji}
            meaning={card.meaning}
            svgSrc={card.svgSrc}
          />
        ))}
      </div>
    </div>
  );
}
