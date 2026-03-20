const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/* ================= ROUTES ================= */

// GET all users
router.get("/", getAllUsers);

// GET user by email
router.get("/:email", getUserByEmail);

// CREATE user
router.post("/", createUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;
