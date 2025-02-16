import Product from "../models/ProductModel.js";

const createProductService = async (data) => {
  try {
    const {
      name,
      price,
      description,
      category,
      image,
      shortDescription,
      type,
      rating,
      countInStock,
    } = data;
    const checkProduct = await Product.findOne({ name: name });
    if (checkProduct) {
      return {
        EC: 1,
        EM: "Product already exists",
      };
    }
    let res = await Product.create({
      name,
      price,
      description,
      category,
      image,
      shortDescription,
      type,
      rating,
      countInStock,
    });
    return {
      EC: 0,
      DT: res,
    };
  } catch (error) {
    return null;
  }
};

const updateProductService = async (id, data) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
      };
    }
    let res = await Product.findOneAndUpdate({ _id: id }, data, { new: true });
    return {
      EC: 0,
      DT: res,
    };
  } catch (error) {
    return null;
  }
};

const getDetailProductService = async (id) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
      };
    }
    let res = await Product.findOne({ _id: id });
    return {
      EC: 0,
      DT: res,
    };
  } catch (error) {
    return null;
  }
};

const deleteProductService = async (id) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
      };
    }
    await Product.findOneAndDelete({ _id: id });
    return {
      EC: 0,
      EM: "Delete product successfully",
    };
  } catch (error) {
    return null;
  }
};

const getAllProductService = async () => {
  try {
    let res = await Product.find();
    return {
      EC: 0,
      DT: res,
    };
  } catch (error) {
    return null;
  }
};

export {
  createProductService,
  updateProductService,
  getDetailProductService,
  deleteProductService,
  getAllProductService,
};
