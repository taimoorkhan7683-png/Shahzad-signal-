// server.js
const express = require("express");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const { createClient } = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// ---- Redis Setup (optional, agar tum use karna chahte ho) ----
let redis;
if (process.env.REDIS_URL) {
  redis = createClient({
    url: process.env.REDIS_URL,
  });
  redis.on("error", (err) => console.error("Redis Error:", err));
  redis.connect();
}

// ---- Basic Route ----
app.get("/", (req, res) => {
  res.send("🚀 Shahzad Signals Backend Running Successfully!");
});

// ---- Example API Route ----
app.get("/signal", async (req, res) => {
  try {
    // Example external API call
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await response.json();

    res.json({
      message: "Signal Data Fetched Successfully",
      btcPrice: data.bpi.USD.rate,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch signal" });
  }
});

// ---- WebSocket Example ----
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.send("📡 Connected to Shahzad Signals WebSocket!");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send(`Echo: ${message}`);
  });
});
