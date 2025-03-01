import {
  createProductService,
  updateProductService,
  getDetailProductService,
  deleteProductService,
  getAllProductService,
} from "../services/productService.js";

const createProduct = async (req, res) => {
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
    } = req.body;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !image ||
      !shortDescription ||
      !type ||
      !rating ||
      !countInStock

    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let data = await createProductService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await updateProductService(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await getDetailProductService(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await deleteProductService(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    let { page, limit, sort, filter } = req.query;

    let data = await getAllProductService(
      Number(page) || 0,
      Number(limit) || 10,
      sort,
      filter
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
};
