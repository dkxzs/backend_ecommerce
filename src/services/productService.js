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
      discount = 0,
    } = data;
    const checkProduct = await Product.findOne({ name: name });
    if (checkProduct) {
      return {
        EC: 1,
        EM: "Product already exists",
        DT: "",
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
      discount,
    });
    return {
      EM: "Create product successfully",
      EC: 0,
      DT: res,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const updateProductService = async (id, data) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
        DT: "",
      };
    }
    let res = await Product.findOneAndUpdate({ _id: id }, data, { new: true });
    return {
      EM: "Update product successfully",
      EC: 0,
      DT: res,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const getDetailProductService = async (id) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
        DT: "",
      };
    }
    let res = await Product.findOne({ _id: id });
    return {
      EM: "Get detail product successfully",
      EC: 0,
      DT: res,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const deleteProductService = async (id) => {
  try {
    let checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return {
        EC: 1,
        EM: "Product not found",
        DT: "",
      };
    }
    await Product.findOneAndDelete({ _id: id });
    return {
      EC: 0,
      EM: "Delete product successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

const getAllProductService = async (page = 0, limit = 10, sort, filter) => {
  try {
    const totalProduct = await Product.countDocuments();

    if (filter) {
      const label = filter[0];
      const allObjectFilter = await Product.find({
        [label]: { $regex: filter[1] },
      });
      return {
        EM: "Get all product successfully",
        EC: 0,
        DT: {
          totalProduct: totalProduct,
          totalPage: Math.ceil(allObjectFilter.length / limit),
          pageCurrent: parseInt(page) + 1,
          data: allObjectFilter,
        },
      };
    }

    if (sort) {
      const objectSort = {};
      objectSort[sort[1]] = sort[0];
      console.log("check sort: ", objectSort);

      let res = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .sort(objectSort);
      return {
        EM: "Get all product successfully",
        EC: 0,
        DT: {
          totalProduct,
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: parseInt(page) + 1,
          data: res,
        },
      };
    }
    let res = await Product.find()
      .limit(limit)
      .skip(page * limit);
    return {
      EM: "Get all product successfully",
      EC: 0,
      DT: {
        totalProduct,
        totalPage: Math.ceil(totalProduct / limit),
        pageCurrent: parseInt(page) + 1,
        data: res,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong",
      EC: -1,
      DT: "",
    };
  }
};

export {
  createProductService,
  updateProductService,
  getDetailProductService,
  deleteProductService,
  getAllProductService,
};
