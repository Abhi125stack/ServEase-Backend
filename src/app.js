const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const cookieParser = require("cookie-parser");


const app = express();

// DB connect
connectDB();

// ✅ Middleware FIRST
app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to ServEase Backend!");
});

module.exports = app;
