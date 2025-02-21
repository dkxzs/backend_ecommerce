import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "./jwtService.js";
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    let checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return {
        EM: "Email already exists",
        EC: 1,
        DT: "",
      };
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let res = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return {
      EM: "Create user successfully",
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

const loginUserService = async (email, password) => {
  try {
    let res = await User.findOne({ email: email });
    if (res) {
      let checkPassword = await bcrypt.compare(password, res.password);
      if (checkPassword) {
        const access_token = generateToken({
          id: res._id.toString(),
          isAdmin: res.isAdmin,
        });
        const refresh_token = generateRefreshToken({
          id: res._id.toString(),
          isAdmin: res.isAdmin,
        });
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            access_token,
            refresh_token,
            user: {
              name: res.name,
              email: res.email,
            },
          },
        };
      } else {
        return {
          EC: 1,
          EM: "Email/Password is incorrect",
          DT: "",
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password is incorrect",
        DT: "",
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

const updateUserService = async (id, data) => {
  try {
    let res = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    return {
      EM: "Update user successfully",
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

const deleteUserService = async (userId) => {
  try {
    await User.findOneAndDelete({ _id: userId });
    return {
      EC: 0,
      EM: "Delete user successfully",
      DT: "",
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

const getAllUserService = async () => {
  try {
    let res = await User.find();
    return {
      EM: "Get all user successfully",
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

const getDetailUserService = async (userId) => {
  try {
    let res = await User.findOne({ _id: userId });
    return {
      EM: "Get detail user successfully",
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
  createUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
  getAllUserService,
  getDetailUserService,
};
