import { getTrackedTrades } from "./services/scraper.js";
import { generateOrders } from "./services/strategy.js";
import { placeOrder } from "./services/trader.js";
import { loadLastTrades, saveLastTrades } from "./storage/store.js";
import { log } from "./utils/logger.js";

async function runBot() {
  log("Trade Bot started");

  const lastTrades = loadLastTrades();
  const trades = await getTrackedTrades();

  const newTrades = trades.filter(t => !lastTrades.includes(t.id));

  if (newTrades.length === 0) {
    log("No new trades detected");
    return;
  }

  log(`Detected ${newTrades.length} new trades`);

  const orders = generateOrders(newTrades);

  for (const order of orders) {
    await placeOrder(order);
    log(`Executed order: ${JSON.stringify(order)}`);
  }

  saveLastTrades(trades.map(t => t.id));
}

setInterval(runBot, 1000 * 60 * 30); // every 30 minutes
runBot();
