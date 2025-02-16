import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(404).json({ EC: 1, EM: "Invalid token" });
    }
    const { payload } = user;

    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({ EC: 1, EM: "Authorization failed" });
    }
  });
};

const authUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.params;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(404).json({ EC: 1, EM: "Invalid token" });
    }
    const { payload } = user;
    console.log("check payload: ", payload.id);
    console.log("check userId: ", userId.id);

    if (payload?.isAdmin || payload?.id === userId.id) {
      next();
    } else {
      return res.status(404).json({ EC: 1, EM: "Authorization failed" });
    }
  });
};

export { auth, authUser };
