import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });
  return refreshToken;
};

const refreshTokenJWTService = async (token) => {
  try {
    let data;
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return null;
      }
      const { payload } = user;
      data = payload;
    });
    const access_token = generateToken({
      id: data?.id,
      isAdmin: data?.isAdmin,
    });
    return {
      EC: 0,
      DT: { access_token },
    };
  } catch (error) {
    return null;
  }
};

export { generateToken, generateRefreshToken, refreshTokenJWTService };
