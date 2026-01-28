import fs from "fs";

const file = "src/data/lastTrades.json";

export function loadLastTrades() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

export function saveLastTrades(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
