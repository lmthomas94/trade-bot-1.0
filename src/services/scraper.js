import axios from "axios";
import * as cheerio from "cheerio";

export async function getTrackedTrades() {
  const url = "https://www.capitoltrades.com/trades?politician=P000197";

  // Fetch the HTML like a real browser
  const html = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const $ = cheerio.load(html.data);
  const trades = [];

  // CapitolTrades uses a table for the trade list
  $("table tbody tr").each((i, el) => {
    const date = $(el).find("td:nth-child(1)").text().trim();
    const ticker = $(el).find("td:nth-child(2)").text().trim();
    const type = $(el).find("td:nth-child(3)").text().trim();

    if (!ticker) return; // skip empty rows

    trades.push({
      id: `${ticker}-${date}-${type}`,
      ticker,
      type,
      date
    });
  });

  console.log(trades);

  return trades;
}
