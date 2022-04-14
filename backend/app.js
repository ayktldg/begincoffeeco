import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./MongoDB.js";
import productRoute from "./routes/productRoutes.js";

const app = express();
const port = 5000;
connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoute);

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running!`);
});
