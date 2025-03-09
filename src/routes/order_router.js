import express from "express";
import { authUser } from "../middleware/auth.js";
import {
  createOrder,
  getAllOrderByUserId,
  getOrderDetailByOrderId,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/get-all-order/:id", getAllOrderByUserId);
router.get("/get-order-detail/:id", getOrderDetailByOrderId);
router.put("/cancel-order/:id", cancelOrder);

export default router;
