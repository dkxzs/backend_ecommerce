import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
} from "../controllers/userController.js";
import { auth, authUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);
router.post("/log-out", logoutUser);
router.put("/update-user/:id", authUser, updateUser);
router.delete("/delete-user/:id", auth, deleteUser);
router.get("/get-all-user", auth, getAllUser);
router.get("/get-detail-user/:id", authUser, getDetailUser);
router.post("/refresh-token", refreshToken);

export default router;
