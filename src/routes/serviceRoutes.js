const express = require("express");
const router = express.Router();
const {
     becomeServiceProvider,
     } = require("../controllers/serviceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/become-provider",
  authMiddleware,
  becomeServiceProvider
);

module.exports = router;
