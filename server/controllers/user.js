import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(500).json({ message: "Already exist user" });
  }

  const hash = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Password cannot be less than 6 characters" });
  }

  const newuser = await User.create({ name, email, password: hash });

  const token = jwt.sign({ id: newuser._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date.now() + 10 * 24 * 60 * 60 * 1000,
  };

  res.status(201).cookie("token", token, cookieOptions).json({
    newuser,
    token,
  });
};

const login = async (req, res, next) => {};

const logout = async (req, res, next) => {};

const forgotPassword = async (req, res, next) => {};

const resetPassword = async (req, res, next) => {};

export default { login, logout, register, forgotPassword, resetPassword };
