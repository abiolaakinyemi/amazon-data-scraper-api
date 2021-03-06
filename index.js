const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const apiKey = "927a78b01b4c775e541f5a5a6250362e";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// const generateScraperUrl = (apiKey) =>
//   `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Welcome Route

app.get("/", async (req, res) => {
  res.send("Welcome to Amazon Scraper API.");
});

// Get Product Details

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  // const { api_key } = req.query;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Product Reviews

app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  // const { api_key } = req.query;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Product Offers

app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  // const { api_key } = req.query;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Search Result

app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  // const { api_key } = req.query;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
