import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import products from './products.js';

import stockPrices from './stock-price.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/stock-price/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  if (!stockPrices[productId]){
    return res.status(404).json({ error: 'Product not found'});
  }

  res.json(stockPrices[productId]);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;