import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import { authPath } from "../middleware/auth.js";

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};

export default routes;
