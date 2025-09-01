// TODO: Create base kanji class.
export class MiniKanji {
  character: string;
  // From the KanjiVG
  svgId: string = "";

  constructor(character: string) {
    this.character = character;
  }

  async populateFromIndex() {
    const res = await fetch(`/kvg-index.json`);
    // Read and parse JSON
    const raw = await res.text();
    const data = JSON.parse(raw);

    // Now `data` is typed as `any`, but you can add a type:
    type SvgMap = Record<string, string[]>;
    const svgs: SvgMap = data;
    this.svgId = svgs[this.character][0].replace("-Kaisho", "").replace(".svg", "");
  }
}
