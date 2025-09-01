export class RadicalInfo {
  character: string;
  relatedKanji?: string[]; // list of kanji characters that include this radical

  constructor(radical: string) {
    this.character = radical;
  }

  async populateFromIndex() {
    const res = await fetch(`/radicals_to_kanji_map.json`);
    // Read and parse JSON
    const raw = await res.text();
    const data = JSON.parse(raw);

    // Now `data` is typed as `any`, but you can add a type:
    type RadicalMap = Record<string, string[]>;
    const radicals: RadicalMap = data;
    this.relatedKanji = radicals[this.character];
  }
}


