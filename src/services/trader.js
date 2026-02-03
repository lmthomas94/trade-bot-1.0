// src/services/trader.js
const alpaca = require('../config/alpaca');

async function buy(symbol, qty) {
  try {
    return await alpaca.createOrder({
      symbol,
      qty,
      side: 'buy',
      type: 'market',
      time_in_force: 'gtc'
    });
  } catch (err) {
    console.error('Buy error:', err.message);
  }
}

async function sell(symbol, qty) {
  try {
    return await alpaca.createOrder({
      symbol,
      qty,
      side: 'sell',
      type: 'market',
      time_in_force: 'gtc'
    });
  } catch (err) {
    console.error('Sell error:', err.message);
  }
}

async function getPosition(symbol) {
  try {
    return await alpaca.getPosition(symbol);
  } catch {
    return null;
  }
}

module.exports = {
  buy,
  sell,
  getPosition
};
