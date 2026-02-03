// src/strategy/trendline.js

/**
 * Detects a double bottom pattern.
 * 
 * Requirements:
 * 1. First low
 * 2. Bounce
 * 3. Second low near first low (within tolerance)
 * 4. Neckline break
 */

function detectDoubleBottom(candles) {
  if (candles.length < 50) return null;

  const tolerance = 0.02; // 2% tolerance between lows
  const lookback = candles.slice(-40); // recent data

  let firstLowIndex = null;
  let secondLowIndex = null;

  // Step 1: Find first low
  for (let i = 5; i < lookback.length - 20; i++) {
    const prev = lookback[i - 1].l;
    const curr = lookback[i].l;
    const next = lookback[i + 1].l;

    if (curr < prev && curr < next) {
      firstLowIndex = i;
      break;
    }
  }

  if (!firstLowIndex) return null;

  const firstLow = lookback[firstLowIndex].l;

  // Step 2: Find second low near first low
  for (let i = firstLowIndex + 10; i < lookback.length - 5; i++) {
    const prev = lookback[i - 1].l;
    const curr = lookback[i].l;
    const next = lookback[i + 1].l;

    if (curr < prev && curr < next) {
      const diff = Math.abs(curr - firstLow) / firstLow;
      if (diff <= tolerance) {
        secondLowIndex = i;
        break;
      }
    }
  }

  if (!secondLowIndex) return null;

  // Step 3: Neckline = highest high between lows
  const neckline = Math.max(
    ...lookback.slice(firstLowIndex, secondLowIndex).map(c => c.h)
  );

  // Step 4: Breakout confirmation
  const lastCandle = lookback[lookback.length - 1];

  if (lastCandle.c > neckline) {
    return {
      signal: 'BUY',
      neckline,
      firstLow,
      secondLow: lookback[secondLowIndex].l
    };
  }

  return null;
}

module.exports = {
  detectDoubleBottom
};
