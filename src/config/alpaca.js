import Alpaca from "@alpacahq/alpaca-trade-api";
import dotenv from "dotenv";

dotenv.config();

export const alpaca = new Alpaca({
  keyId: process.env.ALPACA_KEY,
  secretKey: process.env.ALPACA_SECRET,
  paper: true
});
