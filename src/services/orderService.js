import Order from "../models/OrderProduct.js";
import Product from "../models/ProductModel.js";
import { sendEmailCreateOrder } from "./emailServices.js";

const createOrderService = async (newOrder) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;

    // Kiểm tra tất cả sản phẩm có đủ hàng không
    const productCheck = await Promise.all(
      orderItems.map(async (item) => {
        const productData = await Product.findOne({
          _id: item.product,
          countInStock: { $gte: item.amount },
        });
        return productData ? null : item.product; // Nếu thiếu hàng, trả về id sản phẩm
      })
    );

    const outOfStockItems = productCheck.filter((item) => item !== null);
    if (outOfStockItems.length > 0) {
      return {
        EM: `Sản phẩm với id ${outOfStockItems.join(", ")} không đủ hàng`,
        EC: 1,
        DT: outOfStockItems,
      };
    }

    // Cập nhật số lượng tồn kho của sản phẩm
    await Promise.all(
      orderItems.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { countInStock: -item.amount, selled: +item.amount },
        });
      })
    );

    // Chỉ tạo đơn hàng **một lần**
    const order = await Order.create({
      orderItems,
      shippingAddress: {
        fullName,
        address,
        phone,
      },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user,
      isPaid,
      paidAt,
    });

    if (order) {
      await sendEmailCreateOrder(email, orderItems);
      return {
        EM: "Đặt hàng thành công",
        EC: 0,
        DT: order,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const getAllOrderDetailByUserIdService = async (userId) => {
  try {
    let res = await Order.find({ user: userId });
    return {
      EM: "Get order detail successfully",
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const getOrderDetailByOrderIdService = async (orderId) => {
  try {
    let res = await Order.findById({ _id: orderId });
    return {
      EM: "Get order detail successfully",
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const cancelOrderService = async (orderId, result) => {
  try {
    await Promise.all(
      result.map(async (item) => {
        const productData = await Product.findOneAndUpdate(
          { _id: item.product },
          {
            $inc: { countInStock: item.amount, selled: -item.amount },
          },
          { new: true }
        );

        if (!productData) {
          throw new Error(`Không tìm thấy sản phẩm có ID: ${item.product}`);
        }
      })
    );

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: orderId },
      { status: "canceled" },
      { new: true }
    );
    ư;

    if (!updatedOrder) {
      return {
        EM: "Không tìm thấy đơn hàng để huỷ",
        EC: -1,
        DT: "",
      };
    }

    return {
      EM: "Hủy đơn hàng thành công",
      EC: 0,
      DT: updatedOrder,
    };
  } catch (err) {
    console.log("Lỗi huỷ đơn hàng:", err);
    return {
      EM: "Đã xảy ra lỗi khi huỷ đơn hàng",
      EC: -1,
      DT: "",
    };
  }
};

const getAllOrderService = async () => {
  try {
    let res = await Order.find();
    return {
      EM: "Get all order successfully",
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

export {
  createOrderService,
  getAllOrderDetailByUserIdService,
  getOrderDetailByOrderIdService,
  cancelOrderService,
  getAllOrderService,
};
