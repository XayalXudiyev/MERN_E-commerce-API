import express from "express";

import {
  createProduct,
  allProducts,
  detailProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} from "../controllers/product.js";
import {authMid,roleChecked} from "../middlewares/auth.js";

const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", authMid, roleChecked('admin'), adminProducts);
router.get("/products/:id", detailProduct);
router.post("/product/new", authMid, roleChecked, createProduct);
router.put("/admin/products/:id", authMid, roleChecked, updateProduct);
router.delete("/admin/products/:id", authMid, roleChecked, deleteProduct);
router.post("/product/newReview", authMid, createReview);

export default router;
