const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { signupValidation, loginValidation } = require("../utils/authValidation.js");

const signup = async (req, res, next) => {
  const { name, email, password, role, cardId, profilePhoto } = req.body;

  try {
    // Validation
    const { error } = signupValidation({ name, email, password, role, cardId });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      res.status(400);
      throw new Error("⚠️ Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({ name, email, password: hashedPassword, role, cardId, profilePhoto });

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "365d" }
    );

    res.status(201).json({ user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role, profilePhoto: savedUser.profilePhoto }, token });
    console.log({ user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role, profilePhoto: savedUser.profilePhoto }, token });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation
    const { error } = loginValidation({ email, password });

    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400);
      throw new Error("⚠️ Email not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("❌ Password is wrong");
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "365d" }
    );

    res.status(201).json({ user: { id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role, profilePhoto: existingUser.profilePhoto }, token });
    console.log({ user: { id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role, profilePhoto: existingUser.profilePhoto }, token });
  } catch (error) {
    next(error);
  }
};


const updateProfilePhoto = async (req, res, next) => {
  const { id } = req.params;
  const { profilePhoto } = req.body;


  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`🔍 No user with id: ${id}`);
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error(`🔍 No user with id: ${id}`);
    }

    const updatedUser = { profilePhoto };

    const newUser = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json({ error: false, newUser });
  } catch (error) {
    next(error);
  }
};


module.exports = { login, signup, updateProfilePhoto };
