import express from "express";
import auth, { authUser } from "../middleware/auth.js";
import {
  createOrder,
  getAllOrderByUserId,
  getOrderDetailByOrderId,
  cancelOrder,
  getAllOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/get-all-order/:id", getAllOrderByUserId);
router.get("/get-order-detail/:id", getOrderDetailByOrderId);
router.put("/cancel-order/:id", cancelOrder);
router.get("/get-all-order", getAllOrder);

export default router;
