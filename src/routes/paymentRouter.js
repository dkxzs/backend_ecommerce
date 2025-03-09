import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/config", (req, res) => {
  return res.status(200).json({
    EC: 0,
    data: process.env.CLIENT_ID,
  });
});

export default router;
