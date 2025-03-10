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
    const { name, email, password } = req.body;
    console.log("name: ", name, "email: ", email, "password: ", password);
    let data = await createUserService(name, email, password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await loginUserService(email, password);
    const { refresh_token, ...filteredData } = data.DT;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ ...data, DT: filteredData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      EC: 0,
      EM: "Logout successfully",
      DT: {},
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
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
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(404).json({ message: "Token is not found" });
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
  logoutUser,
};
