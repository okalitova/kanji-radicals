import os
import json
import xml.etree.ElementTree as ET

input_folder = "./public/kanji"
output_file = "./public/radicals_to_kanji_map.json"
jlpt_json_file = "./public/kanji.json"

radical_map = {}

#  Load JLPT JSON data
with open(jlpt_json_file, "r") as f:
    jlpt_data = json.load(f)

def get_jlpt_level(kanji):
    """Return jlpt_new level if kanji exists in JLPT JSON, else None."""
    if kanji in jlpt_data:
        return jlpt_data[kanji].get("jlpt_new")
    return None

for filename in os.listdir(input_folder):
    if filename.endswith(".svg"):
        path = os.path.join(input_folder, filename)
        tree = ET.parse(path)
        root = tree.getroot()

        kanji_id = filename.replace(".svg", "")

        # find any kvg:id attributes
        radicals = root.findall(".//*[@kvg:element]", namespaces={"kvg": "http://kanjivg.tagaini.net"})
        kanji = radicals[0].attrib.get("{http://kanjivg.tagaini.net}element")
        jlpt_level = get_jlpt_level(kanji)
        if jlpt_level is None:
            continue

        for radical in radicals[1:]:
            radical = radical.attrib.get("{http://kanjivg.tagaini.net}element")
            if radical not in radical_map:
                radical_map[radical] = {1: [], 2: [], 3: [], 4: [], 5: []}
            radical_map[radical][jlpt_level].append(kanji)

# save as JSON
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(radical_map, f, ensure_ascii=False, indent=2)

print(f"✅ Extracted {len(radical_map)} kanji into {output_file}")
