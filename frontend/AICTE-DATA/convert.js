import fs from "fs";
import rawData from "./maharashtra_raw.json" assert { type: "json" };

const colleges = rawData.map((row) => ({
  id: row[0],
  name: row[1],
  address: row[2],
  city: row[3],
  type: row[4],
  women: row[5] === "Y",
  minority: row[6] === "Y"
}));

fs.writeFileSync(
  "maharashtra_colleges.json",
  JSON.stringify(colleges, null, 2)
);

console.log("Conversion complete!")