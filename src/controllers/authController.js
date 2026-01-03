const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // default role
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    // 2️⃣ Find user
      const user = await User.findOne({ email }).select("+password")
      console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // 5️⃣ Send response
    res
  .cookie("token", token, {
    httpOnly: true,        // ❌ JS cannot access
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",    // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
  .status(200)
  .json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logout successful" });
};
