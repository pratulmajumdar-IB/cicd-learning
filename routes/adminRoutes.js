const express = require("express");
const adminController = require("../controllers/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/users",
  authenticateToken,
  requireRole("admin"),
  adminController.getUsers,
);

module.exports = router;
