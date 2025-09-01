import os
import json
import xml.etree.ElementTree as ET

input_folder = "./public/kanji"
output_file = "radicals_to_kanji_map.json"

radical_map = {}

for filename in os.listdir(input_folder):
    if filename.endswith(".svg"):
        path = os.path.join(input_folder, filename)
        tree = ET.parse(path)
        root = tree.getroot()

        kanji_id = filename.replace(".svg", "")

        # find any kvg:id attributes
        radicals = root.findall(".//*[@kvg:element]", namespaces={"kvg": "http://kanjivg.tagaini.net"})
        kanji = radicals[0].attrib.get("{http://kanjivg.tagaini.net}element")
        for radical in radicals[1:]:
            radical = radical.attrib.get("{http://kanjivg.tagaini.net}element")
            if radical in radical_map:
                radical_map[radical].append(kanji)
            else:
                radical_map[radical] = [kanji]

# save as JSON
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(radical_map, f, ensure_ascii=False, indent=2)

print(f"✅ Extracted {len(radical_map)} kanji into {output_file}")
