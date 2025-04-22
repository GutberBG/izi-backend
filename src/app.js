import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import saleRoutes from './routes/sale.route.js';
import reportRoutes from './routes/report.routes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de gestión de ventas y stock');
});

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes);

export default app;
