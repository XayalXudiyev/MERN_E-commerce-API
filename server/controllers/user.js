import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import nodemailer from "nodemailer";

const register = async (req, res, next) => {
  const avatar = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 130,
    crop: "scale",
  });

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

  const newuser = await User.create({
    name,
    email,
    password: hash,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  });

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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ message: "Don't exist user" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(500).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: newuser._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date.now() + 10 * 24 * 60 * 60 * 1000,
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date.now(),
  };
  res.status(200).cookie("token", null, cookieOptions).json({
    message: "Logout successful",
  });
};

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.statu(404).json({ message: "User not found" });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = new Date.now() + 30 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // const passwordUrl= 'http://localhost:4000/reset/asasas'
  const passwordUrl = `${req.protokol}://${req.get(
    "host"
  )}/reset/${resetToken}}`;

  const message = `Şifreni sıfırla : ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      port: 587,
      host: "smtp.gmail.com",
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailData = {
      from: process.env.EMAIL_USERNAME,
      to: req.body.email,
      subject: "Reset Password",
      text: message,
    };

    await transporter.sendMail(mailData);

    res.status(200).json({ message: "Email sent" });
  
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res, next) => {};

export { login, logout, register, forgotPassword, resetPassword };
