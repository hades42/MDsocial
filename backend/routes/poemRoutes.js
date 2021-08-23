import express from "express";
import {
  createNewPoem,
  downVotePoemById,
  getListPoems,
  getSinglePoemById,
  upVotePoemById,
} from "../controller/poemController.js";
import { headerProtect } from "../middleWare/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(headerProtect, getListPoems)
  .post(headerProtect, createNewPoem);

router.route("/:id").get(headerProtect, getSinglePoemById);

router.route("/:id/upvote").put(headerProtect, upVotePoemById);

router.route("/:id/devote").put(headerProtect, downVotePoemById);

export default router;
