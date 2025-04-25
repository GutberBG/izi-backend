import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import products from '../seed/product.seed.js';
import sales from '../seed/sale.seed.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado a MongoDB');

  await Product.deleteMany(); 
  await Sale.deleteMany();

  await Sale.insertMany(sales);
  await Product.insertMany(products);

  console.log('Datos insertados correctamente');
  process.exit();
}).catch((err) => {
  console.error('Error al conectar o insertar:', err);
  process.exit(1);
});
