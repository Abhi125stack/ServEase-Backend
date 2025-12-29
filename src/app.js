const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");


const app = express();

// DB connect
connectDB();

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to ServEase Backend!");
});

module.exports = app;
