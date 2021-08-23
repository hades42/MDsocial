import express from "express";
import {
  createNewPoem,
  downVotePoemById,
  getListPoems,
  getSinglePoemById,
  upVotePoemById,
} from "../controller/poemController.js";
const router = express.Router();

router.route("/").get(getListPoems).post(createNewPoem);

router.route("/:id").get(getSinglePoemById);

router.route("/:id/upvote").put(upVotePoemById);

router.route("/:id/devote").put(downVotePoemById);

export default router;
