import mongoose from 'mongoose';

const reportSaleSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalSales: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
    productsSold: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
    }],
    reportDate: { type: Date, default: Date.now },
    user: { type: String, default: 'system' },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export default mongoose.model('ReportSale', reportSaleSchema);
