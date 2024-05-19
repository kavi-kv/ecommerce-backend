const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async function (req, res) {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      const userExisted = await UserModel.findOne({ email });
      if (userExisted) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const hashedPass = await bcryptjs.hash(password, 8);

      let user = new UserModel({
        email,
        password: hashedPass,
        name,
        role,
        profileImage: req.file ? req.file.path : null, // Include the image path if available
      });

      user = await user.save();
      res.json({ message: "User registered successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  loginUser: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  updateUser: async function (req, res) {
    try {
      const { userId } = req.params;
      const { name, email, role } = req.body;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;
      if (req.file) user.profileImage = req.file.path;

      await user.save();
      res.json({ msg: "User updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
