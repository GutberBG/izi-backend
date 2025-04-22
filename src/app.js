const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de gestión de ventas y stock');
});

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

module.exports = app;
