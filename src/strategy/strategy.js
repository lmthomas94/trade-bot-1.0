// src/strategy/strategy.js
const { getHistoricalBars } = require('../services/marketData');
const { detectDoubleBottom } = require('./trendline');

async function runStrategy(symbol) {
  const candles = await getHistoricalBars(symbol, '1Hour', 200);
  if (!candles.length) return null;

  const pattern = detectDoubleBottom(candles);
  if (pattern) {
    return {
      action: pattern.signal,
      details: pattern
    };
  }

  return null;
}

module.exports = {
  runStrategy
};
