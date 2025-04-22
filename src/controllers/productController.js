import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  const { 
    page = 1,
    limit = 10,
    name,
    category,
    supplier,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const filters = { isDeleted: false };

    if (name) {
      filters.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      filters.category = category;
    }

    if (supplier) {
      filters.supplier = supplier;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.json({
      products,
      totalProducts,
      totalPages,
      currentPage: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID', error });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, category, expirationDate, image, supplier } = req.body;

  try {
    const newProduct = new Product({ 
      name, 
      description, 
      price, 
      stock, 
      category, 
      expirationDate, 
      image, 
      supplier 
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted logically', product: deletedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
};


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};