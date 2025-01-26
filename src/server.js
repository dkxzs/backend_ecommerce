import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  res.send("Info page");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
