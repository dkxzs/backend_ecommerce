import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  getAllNewProduct,
  getAllType,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.put("/update-product/:id", auth, updateProduct);
router.get("/get-detail-product/:id", getDetailProduct);
router.delete("/delete-product/:id", auth, deleteProduct);
router.get("/get-all-product", getAllProduct);
router.get("/get-all-new-product", getAllNewProduct);
router.get("/get-all-type", getAllType);

export default router;
