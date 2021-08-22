import express from "express";
import dotenv from "dotenv";
import poemRoutes from "./routes/poemRoutes.js";
import { notFound, errorHandler } from "./middleWare/errorMiddleWare.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/poems", poemRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
