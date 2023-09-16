import Product from "../models/product.js";
import ProductFilter from "../utils/productFilter.js";

const allProducts = async (req, res, next) => {
  const resultPerPage = 10;

  const productFilter = new ProductFilter(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  console.log(productFilter.query);

  const products = await productFilter.query;
  res.status(201).json({
    success: true,
    product,
  });
};

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

const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

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
