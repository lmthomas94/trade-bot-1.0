<<<<<<< HEAD
Trade Bot
Trade Bot is a personal automated trading system that monitors public congressional trade disclosures and automatically mirrors selected trades in your own brokerage account using the Alpaca API.

This project is designed for personal use only.
It is not financial advice, not a commercial product, and not affiliated with any politician, institution, or brokerage.

🚀 Features
Automatically scrapes public congressional trade disclosures

Detects new trades since the last run

Converts disclosures into executable trading orders

Places trades through the Alpaca brokerage API

Runs continuously on a schedule

Fully configurable strategy logic

Lightweight, modular Node.js  architecture

🛠️ Installation
1. Clone the project
-- Code:
-- git clone https://github.com/yourusername/trade-bot
-- cd trade-bot
2. Install dependencies
-- Code:
--- npm install
3. Create your .env file
-- Code:
-- ALPACA_KEY=your_key_here
-- ALPACA_SECRET=your_secret_here
4. Enable Alpaca paper trading
-- Log in to Alpaca and ensure your account is set to paper trading mode.

▶️ Running Trade Bot
Start the bot:

-- Code:
-- npm start
Trade Bot will:

Scrape public trade disclosures

Detect new trades

Apply your strategy rules

Execute trades via Alpaca

Log all actions

Repeat every 30 minutes

🧠 How It Works
1. Scraper
src/services/scraper.js pulls public trade disclosures and normalizes them into structured objects.

2. Strategy
src/services/strategy.js decides what to do with each trade (buy, sell, ignore, size, etc.).

3. Trader
src/services/trader.js sends orders to Alpaca using your API keys.

4. Storage
src/storage/store.js tracks previously seen trades so you never duplicate orders.

5. Scheduler
src/index.js runs the bot on a timed loop.

⚙️ Customization
Change trade size
Edit:

js
qty: 5
in strategy.js.

Follow different politicians
Change the URL in scraper.js.

Add risk controls
Modify strategy.js to include:

max allocation per ticker

stop-loss logic

sector filters

trade amount scaling

Add notifications
You can integrate:

Telegram

Discord

Email

SMS

⚠️ Disclaimer
Trade Bot is for personal, educational, and experimental use only.
It does not guarantee profits, accuracy, or reliability.
You are responsible for all trades executed by this software.

📄 License
MIT License (or any license you prefer).

notes:

what it will do:

Watch AAPL all day

Use only paper trading

Never spend more than $10

Only buy if:

Double‑bottom pattern detected

No open position

Price allows at least 1 share

Only sell if:

You already hold a position

Strategy signals SELL

Runs every minute

Safe, predictable, controlled
=======
"# trade-bot-1.0" 
>>>>>>> f48d1215bafc0673609b73fbef6d647ee4aa3ee1
