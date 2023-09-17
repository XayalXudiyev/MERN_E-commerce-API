import express from "express";

import {
  createProduct,
  allProducts,
  detailProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts
} from "../controllers/product.js";

const router = express.Router();

router.get("/products", allProducts);
router.get('/admin/products',adminProducts)
router.get("/products/:id", detailProduct);
router.post("/product/new", createProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);
router.post('/product/newReview', createReview)

export default router;
