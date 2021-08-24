import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import users, {
  createNewUser,
  findUserByEmail,
  matchPassword,
} from "../data/users.js";
import { checkForEmail, isEmpty } from "../utils/checking.js";
import generateToken from "../utils/generateToken.js";

const getAllusers = (req, res) => {
  res.json(users);
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  try {
    if (user && (await matchPassword(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = findUserByEmail(email);
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (isEmpty(name) || !checkForEmail(email) || isEmpty(password)) {
    res.status(400);
    throw new Error("Invalid user data");
  } else {
    const salt = await bcrypt.genSalt(10);
    const enPassword = await bcrypt.hash(password, salt);
    const user = createNewUser({
      name,
      email,
      password: enPassword,
      isAdmin: false,
    });
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    }
  }
});

export { authUser, registerUser, getAllusers };
