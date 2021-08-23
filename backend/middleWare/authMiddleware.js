const headerProtect = (req, res, next) => {
  if (req.headers["bob"] === "Bobalooba") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};

export { headerProtect };
