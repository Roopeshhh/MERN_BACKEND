const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
// Import controller functions
const {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

/* ================= ROUTES ================= */

// LOGIN
router.post("/login", loginUser);

// GET all users
router.get("/", getAllUsers);

//
router.get("/", authMiddleware, getAllUsers);

// GET user by email
router.get("/:email", getUserByEmail);

// CREATE user
router.post("/", createUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;
