// src/services/marketData.js
const alpaca = require('../config/alpaca');

async function getHistoricalBars(symbol, timeframe = '1Hour', limit = 200) {
  try {
    const bars = await alpaca.getBarsV2(
      symbol,
      {
        timeframe,
        limit,
        adjustment: 'raw'
      }
    );

    const results = [];
    for await (let b of bars) {
      results.push({
        t: b.Timestamp,
        o: b.OpenPrice,
        h: b.HighPrice,
        l: b.LowPrice,
        c: b.ClosePrice,
        v: b.Volume
      });
    }

    return results;
  } catch (err) {
    console.error('Error fetching bars:', err.message);
    return [];
  }
}

async function getLatestPrice(symbol) {
  try {
    const bars = alpaca.getBarsV2(symbol, {
      timeframe: '1Min',
      limit: 1,
      adjustment: 'raw'
    });

    let last = null;
    for await (let b of bars) {
      last = b;
    }

    return last ? last.ClosePrice : null;
  } catch (err) {
    console.error('Error fetching latest price:', err.message);
    return null;
  }
}

module.exports = {
  getHistoricalBars,
  getLatestPrice
};
