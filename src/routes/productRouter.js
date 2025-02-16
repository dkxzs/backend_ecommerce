import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.put("/update-product/:id", auth, updateProduct);
router.get("/get-detail-product/:id", getDetailProduct);
router.delete("/delete-product/:id", auth, deleteProduct);
router.get("/get-all-product", getAllProduct);

export default router;
