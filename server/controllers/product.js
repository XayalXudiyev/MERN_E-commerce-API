import Product from "../models/product";
import ProductFilter from "../utils/productFilter";
// Get all products => /api/v1/products
const allProducts = async (req, res, next) => {
  const productFilter = new ProductFilter(req.query);

  const products = await Product.find();
  res.status(201).json({
    success: true,
    product,
  });
};

// Get single product details => /api/v1/product/:id
const detailProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// Create new product =>
const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//delete product => /api/v1/admin/product/:id
const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
};

// update product => /api/v1/admin/product/:id
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Product is updated",
  });
};

export {
  createProduct,
  allProducts,
  detailProduct,
  deleteProduct,
  updateProduct,
};
