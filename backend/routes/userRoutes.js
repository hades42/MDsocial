import express from "express";
import {
  authUser,
  registerUser,
  getAllusers,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").get(getAllusers);
router.post("/login", authUser);
router.route("/").post(registerUser);

export default router;
