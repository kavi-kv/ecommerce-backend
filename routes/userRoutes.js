const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser,updateUser } = require("../controllers/userController.js");
const { uploadImage } = require("../multer/uploadsConfig.js");

userRouter.post(
  "/api/regUser",
  uploadImage().single("profileImage"),
  registerUser
);
userRouter.post("/api/login", loginUser);
userRouter.put("/api/update/:userId", updateUser);

module.exports = userRouter;
