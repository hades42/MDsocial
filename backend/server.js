import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import poemRoutes from "./routes/poemRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleWare/errorMiddleWare.js";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/poems", poemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
