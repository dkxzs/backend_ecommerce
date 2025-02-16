import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from "./jwtService.js";
const saltRounds = 10;

const createUserService = async (name, email, password, phone) => {
  try {
    let checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return {
        message: "Email already exists",
      };
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    let res = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
    });
    return {
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const loginUserService = async (email, password) => {
  try {
    let res = await User.findOne({ email: email });
    if (res) {
      let checkPassword = await bcrypt.compare(password, res.password);
      if (checkPassword) {
        const access_token = generateToken({
          id: res.id,
          isAdmin: res.isAdmin,
        });
        const refresh_token = generateRefreshToken({
          id: res.id,
          isAdmin: res.isAdmin,
        });
        return {
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
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password is incorrect",
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateUserService = async (id, data) => {
  try {
    let res = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    return {
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteUserService = async (userId) => {
  try {
    await User.findOneAndDelete({ _id: userId });
    return {
      EC: 0,
      EM: "Delete user successfully",
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllUserService = async () => {
  try {
    let res = await User.find();
    return {
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getDetailUserService = async (userId) => {
  try {
    let res = await User.findOne({ _id: userId });
    return {
      EC: 0,
      DT: res,
    };
  } catch (err) {
    console.log(err);
    return null;
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
