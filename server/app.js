import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import productRoutes from "./routes/product.js";

dotenv.config();
const app = express();
db();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/", productRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port ${PORT}");
});
