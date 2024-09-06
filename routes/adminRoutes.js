// routes/adminRoutes.js

const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const router = express.Router();

// Only allow access to users with the 'admin' role
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminController.getDashboard
);

module.exports = router;
