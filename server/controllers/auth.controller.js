import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

import Cart from "../models/cart.model.js";

import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing name and/or email and/or password",
    });

  try {
    const user = await User.findOne({ email }).lean();

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    await Cart.create({
      userId: newUser._id,
    });

    res.status(200).json({
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing email and/or password",
    });

  try {
    const user = await User.findOne({ email }).lean();

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signinByAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing email and/or password",
    });

  try {
    const user = await User.findOne({ email }).lean();

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    if (!user.isAdmin)
      return res
        .status(400)
        .json({ success: false, message: "You are not admin" });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
