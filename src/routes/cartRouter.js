import express from "express";
import { authUser } from "../middleware/auth.js";
import { updateCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.put("/update-cart/:id", updateCart);
router.get("/get-cart/:id", getCart);

export default router;
