import dotenv from "dotenv";
dotenv.config();

import {
  createOrderService,
  getAllOrderDetailByUserIdService,
  getOrderDetailByOrderIdService,
  cancelOrderService,
  getAllOrderService,
} from "../services/orderService.js";

const createOrder = async (req, res) => {
  try {
    const data = await createOrderService(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getAllOrderDetailByUserIdService(id);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getOrderDetailByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOrderDetailByOrderIdService(id);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: result } = req.body;
    const data = await cancelOrderService(id, result);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const data = await getAllOrderService();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export {
  createOrder,
  getAllOrderByUserId,
  getOrderDetailByOrderId,
  cancelOrder,
  getAllOrder,
};
