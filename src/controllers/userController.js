import { refreshTokenJWTService } from "../services/jwtService.js";
import {
  createUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
  getAllUserService,
  getDetailUserService,
} from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isValidEmail === false) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    let data = await createUserService(name, email, password, phone);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let data = await loginUserService(email, password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isValidEmail === false) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    let data = await updateUserService(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    let data = await deleteUserService(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    let data = await getAllUserService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await getDetailUserService(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token is required" });
    }
    const data = await refreshTokenJWTService(token);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
};
