import { getCartService, updateCartService } from "../services/cartServices.js";

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCartService(id, req.body);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCartService(id, req.body);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export { updateCart, getCart };
