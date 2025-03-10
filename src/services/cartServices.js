import Cart from "../models/CartModel.js";

const updateCartService = async (userId, cartItems) => {
  try {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      discount: item.discount ?? 0,
    }));
    const result = await Cart.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        cartItems: updatedCartItems,
      },
      { upsert: true, new: true }
    );
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getCartService = async (userId) => {
  try {
    const result = await Cart.findOne({ user: userId }).populate("cartItems");
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { updateCartService, getCartService };
