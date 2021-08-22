import express from "express";
import dotenv from "dotenv";
import poems, { findPostById } from "./data/poems.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/poems", (req, res) => {
  res.send(poems);
});

app.get("/api/poems/:id", (req, res) => {
  const poemId = req.params.id;
  const data = findPostById(poemId);
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    res.send({ error: "cant find the post" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
