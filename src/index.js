// src/index.js
require('dotenv').config();
const { runStrategy } = require('./strategy/strategy');
const { buy, sell, getPosition } = require('./services/trader');
const { getLatestPrice } = require('./services/marketData');
const logger = require('./utils/logger');

const SYMBOL = 'AAPL';
const MAX_DOLLARS_PER_TRADE = 10; // hard cap for your test

async function computeQuantity(symbol) {
  const price = await getLatestPrice(symbol);
  if (!price || price <= 0) {
    logger.error('Invalid latest price, cannot compute quantity.');
    return 0;
  }

  const qty = Math.floor(MAX_DOLLARS_PER_TRADE / price);

  if (qty < 1) {
    logger.info(
      `Price too high for $${MAX_DOLLARS_PER_TRADE}. Current price: $${price.toFixed(2)}`
    );
    return 0;
  }

  logger.info(`Computed quantity: ${qty} shares at ~$${price.toFixed(2)}`);
  return qty;
}

async function tick() {
  logger.info('Running strategy tick...');

  const signal = await runStrategy(SYMBOL);
  if (!signal) {
    logger.info('No signal detected.');
    return;
  }

  logger.info(`Signal detected: ${signal.action}`);

  const position = await getPosition(SYMBOL);

  // BUY LOGIC
  if (signal.action === 'BUY') {
    if (position) {
      logger.info('Position already open, skipping BUY.');
      return;
    }

    const qty = await computeQuantity(SYMBOL);
    if (qty < 1) {
      logger.info('Quantity < 1, skipping BUY.');
      return;
    }

    logger.info(`Placing BUY for ${qty} shares of ${SYMBOL}...`);
    await buy(SYMBOL, qty);
    return;
  }

  // SELL LOGIC
  if (signal.action === 'SELL') {
    if (!position) {
      logger.info('No open position, skipping SELL.');
      return;
    }

    logger.info(`Placing SELL for ${position.qty} shares of ${SYMBOL}...`);
    await sell(SYMBOL, position.qty);
    return;
  }

  logger.info('Unknown signal action, doing nothing.');
}

// Run every minute; keep your local machine on to monitor all day
setInterval(tick, 60 * 1000);
