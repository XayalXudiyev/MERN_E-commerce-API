import User from "../models/user.js";
import  jwt  from "jsonwebtoken";

const authMid = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(500).json({ message: "Please login" });
  }
  const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
  if (!decodedData) {
    return res.status(500).json({ message: "Login failed" });
  }
  req.user = await User.finfById(decodedData.id);

  next();
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export  { authMid, roleChecked };
