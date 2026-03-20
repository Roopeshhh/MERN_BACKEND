console.log("API hit");
const pool = require("../config/db");

/* ================= GET ALL USERS ================= */

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");

    return res.status(200).json({
      data: users,
      message: "Users fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurred");
  }
};

/* ================= GET USER BY EMAIL ================= */

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const [user] = await pool.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      data: user,
      message: "User fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurred");
  }
};

/* ================= CREATE USER ================= */

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email=?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, password],
    );

    return res.status(200).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred",
    });
  }
};

/* ================= UPDATE USER ================= */

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    const [user] = await pool.query("SELECT * FROM users WHERE id=?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const [result] = await pool.query(
      "UPDATE users SET name=?, email=?, password=? WHERE id=?",
      [name, email, password, id],
    );

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred",
    });
  }
};

/* ================= DELETE USER ================= */

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const [user] = await pool.query("SELECT * FROM users WHERE id=?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await pool.query("DELETE FROM users WHERE id=?", [id]);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred",
    });
  }
};
