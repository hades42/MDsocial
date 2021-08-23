import { v4 as uuidv4 } from "uuid";
import poems, {
  findPostById,
  upVoteById,
  deVoteById,
  createNewData,
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
// @access  Public
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
// @access  Public
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
// @access  Public
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
export {
  getSinglePoemById,
  getListPoems,
  upVotePoemById,
  downVotePoemById,
  createNewPoem,
};
