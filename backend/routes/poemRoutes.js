import express from "express";
import poems, { findPostById, upVoteById, deVoteById } from "../data/poems.js";
const router = express.Router();

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
router.get("/", (req, res) => {
  res.send(poems);
});

// @desc    Fetch single poem
// @route   GET /api/poems/:id
// @access  Public
router.get("/:id", (req, res) => {
  const poemId = req.params.id;
  const data = findPostById(poemId);
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Could not find the poem");
  }
});

// @desc    upvote single poem
// @route   PUT /api/poems/:id/upvote
// @access  Public
router.put("/:id/upvote", (req, res) => {
  const poemId = req.params.id;
  const data = findPostById(poemId);
  if (data) {
    const curr = upVoteById(poemId);
    res.json({
      id: poemId,
      votes: curr,
    });
  } else {
    res.status(404);
    throw new Error("Could not find the poem");
  }
});

// @desc    devote single poem
// @route   PUT /api/poems/:id/devote
// @access  Public
router.put("/:id/devote", (req, res) => {
  const poemId = req.params.id;
  const data = findPostById(poemId);
  if (data) {
    const curr = deVoteById(poemId);
    res.json({
      id: poemId,
      votes: curr,
    });
  } else {
    res.status(404);
    throw new Error("Could not find the poem");
  }
});
export default router;
