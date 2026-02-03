// src/config/alpaca.js
const Alpaca = require('@alpacahq/alpaca-trade-api');

module.exports = new Alpaca({
  keyId: process.env.ALPACA_KEY,
  secretKey: process.env.ALPACA_SECRET,
  paper: true
});
