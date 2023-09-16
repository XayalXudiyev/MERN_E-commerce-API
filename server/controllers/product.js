import Product from "../models/product.js";
import ProductFilter from "../utils/productFilter.js";
import { v2 as cloudinary } from "cloudinary";

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

const adminProducts = async (req, res, next) => {
  const products = await Product.find();

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
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let allImage = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
};

const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }
  }

  let allImage = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product is updated",
  });
};

const createReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  product.reviews.push(review);

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "yorum eklendi",
  });
};

export {
  createProduct,
  allProducts,
  detailProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts
};
