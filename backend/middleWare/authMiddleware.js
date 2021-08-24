import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { findUserById } from "../data/users.js";

const headerProtect = (req, res, next) => {
  if (req.headers["bob"] === "Bobalooba") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};

const protect = asyncHandler((req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const returnUser = findUserById(decoded.id);
      if (!returnUser) {
        res.status(401);
        throw new Error("Not authorized, please sign in");
      }
      req.user = {
        id: returnUser.id,
        name: returnUser.name,
        email: returnUser.email,
        isAdmin: returnUser.isAdmin,
      };
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please sign in");
  }
});

export { headerProtect, protect };
