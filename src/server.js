import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/database.js";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
