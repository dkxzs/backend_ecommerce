import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import order_router from "./order_router.js";
import paymentRouter from "./paymentRouter.js";
import cartRouter from "./cartRouter.js";
import { authPath } from "../middleware/auth.js";

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", order_router);
  app.use("/api/payment", paymentRouter);
  app.use("/api/cart", cartRouter);
};

export default routes;
