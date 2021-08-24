import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";
import poems, {
  findPostById,
  upVoteById,
  deVoteById,
  createNewData,
  addComment,
} from "../data/poems.js";
import { isEmpty } from "../utils/checking.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
const getListPoems = (req, res) => {
  res.send(poems);
};

// @desc    Fetch single poem
// @route   GET /api/poems/:id
// @access  Public
const getSinglePoemById = (req, res) => {
  const poemId = req.params.id;
  const data = findPostById(poemId);
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Could not find the poem");
  }
};

// @desc    upvote single poem
// @route   PUT /api/poems/:id/upvote
// @access  Private
const upVotePoemById = (req, res) => {
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
};

// @desc    devote single poem
// @route   PUT /api/poems/:id/devote
// @access  Private
const downVotePoemById = (req, res) => {
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
};

// @desc    Add new poem
// @route   POST /api/poems
// @access  Private
const createNewPoem = (req, res) => {
  const { title, author, text } = req.body;
  if (isEmpty(title) || isEmpty(author) || isEmpty(text)) {
    res.status(400);
    throw new Error("Invalid data");
  } else {
    const newData = {
      id: uuidv4(),
      title,
      author,
      text,
      votes: 0,
      createdAt: new Date(),
    };
    createNewData(newData);
    res
      .status(200)
      .json({ message: "Create new poem successfully", data: newData });
  }
};

// @desc    Add new comment to specific poem
// @route   POST /api/poems/:id/comment
// @access  Private
const addCommentById = asyncHandler((req, res) => {
  const poemId = req.params.id;
  const { userId, name, text } = req.body;

  const existPoem = findPostById(poemId);
  if (existPoem) {
    if (isEmpty(name) || isEmpty(text)) {
      res.status(400);
      throw new Error("Invalid data");
    } else {
      const createdComment = {
        id: uuidv4(),
        userId,
        name,
        text,
        createdAt: new Date(),
      };
      addComment(poemId, createdComment);
      res.status(201).json({ message: "Comment added" });
    }
  } else {
    res.status(404);
    throw new Error("Poem not found");
  }
});

export {
  getSinglePoemById,
  getListPoems,
  upVotePoemById,
  downVotePoemById,
  createNewPoem,
  addCommentById,
};
