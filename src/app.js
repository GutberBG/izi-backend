const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de gestión de ventas y stock');
});

app.use('/api/products', productRoutes);

module.exports = app;
