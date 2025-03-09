import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(404).json({ EC: 1, EM: err.message });
    }

    if (user?.isAdmin) {
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
    if (user?.isAdmin || user?.id === userId.id) {
      next();
    } else {
      return res.status(404).json({ EC: 1, EM: "Authorization failed" });
    }
  });
};

const authPath = (req, res, next) => {
  const allow_paths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/product",
    "/about",
    "/contact",
  ];

  if (allow_paths.some((item) => req.originalUrl.endsWith(item))) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
          createdBy: "sudodev",
        };
        next();
      } catch (error) {
        return res.status(401).json({ message: "Token bị hết hạn" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

export default auth;

export { auth, authUser, authPath };
