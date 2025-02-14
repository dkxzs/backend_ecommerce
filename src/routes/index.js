import userRouter from "./userRouter.js";

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.get("/api/product", (req, res) => {
    res.send({
      message: "Hello world",
    });
  });
};

export default routes;
