import express from "express";
import {
  createNewPoem,
  downVotePoemById,
  getListPoems,
  getSinglePoemById,
  upVotePoemById,
} from "../controller/poemController.js";
import { headerProtect, protect } from "../middleWare/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(headerProtect, getListPoems)
  .post(headerProtect, protect, createNewPoem);

router.route("/:id").get(headerProtect, getSinglePoemById);

router.route("/:id/upvote").put(headerProtect, protect, upVotePoemById);

router.route("/:id/devote").put(headerProtect, protect, downVotePoemById);

export default router;
