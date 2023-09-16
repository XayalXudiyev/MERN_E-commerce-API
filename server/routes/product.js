import express from "express";

import {
  createProduct,
  allProducts,
  detailProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", detailProduct);
router.post("/product/new", createProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

export default router;
