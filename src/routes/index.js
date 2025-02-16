import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};

export default routes;
