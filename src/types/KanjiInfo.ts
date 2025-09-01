export interface Example {
  word: string;
  meaning: string;
}

export class KanjiInfo {
  character: string;
  // From the KanjiAlive
  meaning: string[] = [];
  onyomi: string[] = [];
  kunyomi: string[] = [];
  examples: Example[] = [];
  jlpt?: number;
  // From the KanjiVG
  svgId: string = "";

  constructor(character: string) {
    this.character = character;
  }

  async populateFromIndex(): Promise<this> {
    const res = await fetch(`/kvg-index.json`);
    // Read and parse JSON
    const raw = await res.text();
    const data = JSON.parse(raw);

    // Now `data` is typed as `any`, but you can add a type:
    type SvgMap = Record<string, string[]>;
    const svgs: SvgMap = data;
    this.svgId = svgs[this.character][0].replace(".svg", "");

    return this;
  }

  // Fetch and populate Kanji info
  async populateFromKanjiAlive(): Promise<this> {
    const url = `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(
      this.character
    )}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KANJIALIVE_API_KEY!,
        "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch kanji info: ${response.status}`);
    }

    const data = await response.json();

    // Map the API response to your fields
    this.meaning = data.meaning ? [data.meaning] : [];
    this.onyomi = data.onyomi_ja ? [data.onyomi_ja] : [];
    this.kunyomi = data.kunyomi_ja ? [data.kunyomi_ja] : [];
    this.jlpt = data.grade;

    // Examples
    this.examples = data.examples
      ? data.examples.map((ex: any) => ({
          word: ex.japanese,
          meaning: ex.meaning.english,
        }))
      : [];
    
    return this;
  }
}
