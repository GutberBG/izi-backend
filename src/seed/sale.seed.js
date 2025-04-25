
import mongoose from 'mongoose';

const productIds = [
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa100"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa101"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa102"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa103"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa104"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa105"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa106"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa107"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa108"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa109"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10a"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10b"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10c"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10d"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10e"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa10f"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa110"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa111"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa112"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa113"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa114"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa115"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa116"),
  new mongoose.Types.ObjectId("6445d7f1e4b0fd586f3fa117")
];

export default [
  {
    items: [
      { product: productIds[0], quantity: 2, unitPrice: 25.5, subtotal: 51 },
      { product: productIds[2], quantity: 1, unitPrice: 35, subtotal: 35 },
    ],
    total: 86,
    note: "Venta de productos frescos",
  },
  {
    items: [
      { product: productIds[3], quantity: 3, unitPrice: 45, subtotal: 135 },
      { product: productIds[1], quantity: 1, unitPrice: 15, subtotal: 15 },
    ],
    total: 150,
    note: "Venta de electrónicos y accesorios",
  },
  {
    items: [
      { product: productIds[4], quantity: 5, unitPrice: 10, subtotal: 50 },
      { product: productIds[6], quantity: 1, unitPrice: 70, subtotal: 70 },
    ],
    total: 120,
    note: "Venta de productos de limpieza",
  },
  {
    items: [
      { product: productIds[5], quantity: 2, unitPrice: 30, subtotal: 60 },
      { product: productIds[8], quantity: 1, unitPrice: 120, subtotal: 120 },
    ],
    total: 180,
    note: "Venta de ropa y accesorios",
  },
  {
    items: [
      { product: productIds[7], quantity: 3, unitPrice: 22, subtotal: 66 },
      { product: productIds[10], quantity: 2, unitPrice: 90, subtotal: 180 },
    ],
    total: 246,
    note: "Venta de artículos de hogar",
  },
  {
    items: [
      { product: productIds[12], quantity: 1, unitPrice: 20, subtotal: 20 },
      { product: productIds[13], quantity: 4, unitPrice: 50, subtotal: 200 },
    ],
    total: 220,
    note: "Venta de artículos de oficina",
  },
  {
    items: [
      { product: productIds[15], quantity: 1, unitPrice: 18, subtotal: 18 },
      { product: productIds[16], quantity: 2, unitPrice: 25, subtotal: 50 },
    ],
    total: 68,
    note: "Venta de artículos varios",
  },
  // Continúa agregando las ventas con combinaciones de productos
];


