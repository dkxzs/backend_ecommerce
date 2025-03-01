import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (payload) => {
  const accessToken = jwt.sign(
    { ...payload },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    { ...payload },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "365d",
    }
  );
  return refreshToken;
};

const refreshTokenJWTService = async (token) => {
  try {
    let data;
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return {
          EM: "Refresh token is invalid",
          EC: -1,
          DT: "",
        };
      }
      data = user;
    });
    const access_token = generateToken({
      id: data?.id,
      isAdmin: data?.isAdmin,
    });
    return {
      EM: "Refresh token successfully",
      EC: 0,
      DT: { access_token },
    };
  } catch (error) {
    return {
      EM: error,
      EC: -1,
      DT: "",
    };
  }
};

export { generateToken, generateRefreshToken, refreshTokenJWTService };
