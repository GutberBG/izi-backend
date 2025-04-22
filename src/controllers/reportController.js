import Sale from '../models/Sale.js';
import ReportSale from '../models/Report.js';

const createReport = async (req, res) => {
    const { startDate, endDate } = req.body;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }
  
    try {
      const sales = await Sale.find({
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        isDeleted: false 
      }).populate('items.product');
  
      const totalSales = sales.length;
      const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  
      const productsSold = [];
  
      sales.forEach((sale) => {
        if (Array.isArray(sale.items)) {
          sale.items.forEach((item) => {
            if (!item.product || !item.product._id) return;
  
            const existingProduct = productsSold.find(
              (p) => p.productId.toString() === item.product._id.toString()
            );
  
            if (existingProduct) {
              existingProduct.quantity += item.quantity;
              existingProduct.total += item.quantity * item.product.price;
            } else {
              productsSold.push({
                productId: item.product._id,
                productName: item.product.name,
                quantity: item.quantity,
                total: item.quantity * item.product.price,
              });
            }
          });
        }
      });
  
      const newReport = new ReportSale({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalSales,
        totalRevenue,
        productsSold,
        isDeleted: false,
      });
  
      await newReport.save();
  
      res.status(201).json(newReport);
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ message: 'Error creating report', error });
    }
  };
  

  const getReports = async (req, res) => {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
  
    try {
      const filters = {};

      if (startDate && endDate) {
        filters.startDate = { $gte: new Date(startDate) };
        filters.endDate = { $lte: new Date(endDate) };
      } else if (startDate) {
        filters.startDate = { $gte: new Date(startDate) };
      } else if (endDate) {
        filters.endDate = { $lte: new Date(endDate) };
      }
  
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
  
      const reports = await ReportSale.find(filters)
        .populate('productsSold.productId')
        .sort({ reportDate: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
      const totalReports = await ReportSale.countDocuments(filters);
      const totalPages = Math.ceil(totalReports / limitNumber);
  
      res.json({
        reports,
        totalReports,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  
  const getReportById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await ReportSale.findById(id).populate('productsSold.productId');
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report', error });
    }
  };
  
  const updateReport = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedReport = await ReportSale.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      res.json(updatedReport);
    } catch (error) {
      res.status(400).json({ message: 'Error updating report', error });
    }
  };

  const deleteReport = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedReport = await ReportSale.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
  
      if (!deletedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      res.json({ message: 'Report logically deleted', report: deletedReport });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting report', error });
    }
  };

export {
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport,
};