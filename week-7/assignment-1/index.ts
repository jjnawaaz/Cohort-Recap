import express, { Express } from "express";
const app: Express = express();
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/courses")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo DB connection error", err));
