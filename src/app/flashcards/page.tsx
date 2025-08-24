import { KanjiInfo } from "@/types/KanjiInfo";
import KanjiCard from "./components/KanjiCard";
import { mockKanji } from "@/mock/kanji後";

type FlashcardData = {
  kanji: KanjiInfo;
};

const flashcardData = {
  kanji: mockKanji,
};

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Kanji Flashcards</h1>
      <div className="flex">
          <KanjiCard kanji={flashcardData.kanji}/>
      </div>
    </div>
  );
}
