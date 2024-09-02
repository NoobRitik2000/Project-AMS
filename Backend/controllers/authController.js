import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
      success: "registration done...",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // Create a JWT token (if using authentication tokens)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({ status: "success", token });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
