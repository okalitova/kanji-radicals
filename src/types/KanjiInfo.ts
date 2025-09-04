export type Example = {
  word: string;
  meaning: string;
}

export type Data = {
  meaning: string[];
  onyomi: string[];
  kunyomi: string[];
  examples: Example[];
  grade: number;
}

export class KanjiInfo {
  character: string;
  // From the KanjiAlive
  data: Data = {} as Data;
  // From the KanjiVG
  svgId: string = "";

  constructor(character: string) {
    this.character = character;
  }

  async fetch() {
    this.data = await populateFromKanjiAlive(this.character);
    this.svgId = await populateFromIndex(this.character);
  }
}

export async function populateFromIndex(character: string): Promise<string> {
  const res = await fetch(`/kvg-index.json`);
  // Read and parse JSON
  const raw = await res.text();
  const data = JSON.parse(raw);

  // Now `data` is typed as `any`, but you can add a type:
  type SvgMap = Record<string, string[]>;
  const svgs: SvgMap = data;
  const svgId = svgs[character][0].replace(".svg", "").split("-")[0];
  return svgId;
}

export async function populateFromKanjiAlive(character: string): Promise<Data> {
  const url = `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(character)}`;
  
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

  const res = await response.json();
  var data = {} as Data;
  // Map the API response to your fields
  data.meaning = res.meaning ? [res.meaning] : [];
  data.onyomi = res.onyomi_ja ? [res.onyomi_ja] : [];
  data.kunyomi = res.kunyomi_ja ? [res.kunyomi_ja] : [];
  data.grade = res.grade;

  // Examples
  data.examples = res.examples
    ? res.examples.map((ex: any) => ({
        word: ex.japanese,
     
   meaning: ex.meaning.english,
      }))
    : [];
  return data;
};
