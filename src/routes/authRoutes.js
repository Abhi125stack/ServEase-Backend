const express = require("express");
const router = express.Router();

const { login, registerUser} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
