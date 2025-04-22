const Product = require('../models/Product');
const Sale = require('../models/Sale');

const createSale = async (req, res) => {
    const { items, note, user } = req.body;

    try {

        const products = await Product.find({ '_id': { $in: items.map(item => item.product) } });

        for (let i = 0; i < items.length; i++) {
            const product = products.find(p => p._id.toString() === items[i].product);
            if (!product || product.stock < items[i].quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
        }

        let total = 0;
        const saleItems = items.map(item => {
            const product = products.find(p => p._id.toString() === item.product);
            const subtotal = product.price * item.quantity;
            total += subtotal;

            product.stock -= item.quantity;
            product.save();

            return {
                product: item.product,
                quantity: item.quantity,
                unitPrice: product.price,
                subtotal,
            };
        });

        const sale = new Sale({
            items: saleItems,
            total,
            note: note || '',
            user: user || 'system',
        });

        await sale.save();
        res.status(201).json(sale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing sale', error });
    }
};

const getSales = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        user,
        minTotal,
        maxTotal,
        startDate,
        endDate,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isDeleted = false
    } = req.query;

    try {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const filters = { isDeleted };

        if (user) {
            filters.user = user;
        }

        if (minTotal || maxTotal) {
            filters.total = {};
            if (minTotal) filters.total.$gte = parseFloat(minTotal);
            if (maxTotal) filters.total.$lte = parseFloat(maxTotal);
        }

        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date.$gte = new Date(startDate);
            if (endDate) filters.date.$lte = new Date(endDate);
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const sales = await Sale.find(filters)
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('items.product');

        const totalSales = await Sale.countDocuments(filters);
        const totalPages = Math.ceil(totalSales / limitNumber);

        res.json({
            sales,
            totalSales,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error });
    }
};

const getSaleById = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sale.findOne({ _id: id, isDeleted: false }).populate('items.product');

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.json(sale);
    } catch (error) {
        res.status(400).json({ message: 'Invalid sale ID', error });
    }
};

const updateSale = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedSale = await Sale.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.json(updatedSale);
    } catch (error) {
        res.status(400).json({ message: 'Error updating sale', error });
    }
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sale.findById(id);

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        sale.isDeleted = true;
        await sale.save();

        res.json({ message: 'Sale logically deleted', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error logically deleting sale', error });
    }
};


module.exports = {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
};
