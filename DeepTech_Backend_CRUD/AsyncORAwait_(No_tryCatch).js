const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json()); // middleware to read JSON body

/* -------------------- DATABASE CONNECTION -------------------- */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "backend_practice",
});

/* =====================================================
   GET ALL USERS
===================================================== */

app.get("/users", async (req, res) => {
  // Fetch all users from database
  const users = await pool.promise().query("SELECT * FROM users");

  // users[0] contains rows
  return res.status(200).json({
    message: "Users fetched successfully",
    data: users[0],
  });
});

/* =====================================================
   GET USER BY EMAIL
===================================================== */

app.get("/users/:email", async (req, res) => {
  // Get email from URL parameter
  const email = req.params.email;

  // Find user with given email
  const userFound = await pool
    .promise()
    .query("SELECT * FROM users WHERE email=?", [email]);

  // If user not found
  if (userFound[0].length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Return user data
  return res.status(200).json({
    message: "User fetched successfully",
    data: userFound[0],
  });
});

/* =====================================================
   CREATE USER
===================================================== */

app.post("/users", async (req, res) => {
  const payload = req.body;

  /* ---------- Step 1 : Check email already exists ---------- */

  const userExists = await pool
    .promise()
    .query("SELECT * FROM users WHERE email=?", [payload.email]);

  if (userExists[0].length > 0) {
    return res.status(400).json({
      message: "User with given email already exists",
    });
  }

  /* ---------- Step 2 : Insert new user ---------- */

  const insertUser = await pool
    .promise()
    .query("INSERT INTO users(name,email,password) VALUES(?,?,?)", [
      payload.name,
      payload.email,
      payload.password,
    ]);

  // Check if user created
  if (insertUser[0].affectedRows === 1) {
    return res.status(201).json({
      message: "User created successfully",
    });
  } else {
    return res.status(200).json({
      message: "Request successful but user not created",
    });
  }
});

/* =====================================================
   UPDATE USER
===================================================== */

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  /* ---------- Step 1 : Check if user exists ---------- */

  const userFound = await pool
    .promise()
    .query("SELECT * FROM users WHERE id=?", [id]);

  if (userFound[0].length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  /* ---------- Step 2 : Update user ---------- */

  const updateUser = await pool
    .promise()
    .query("UPDATE users SET name=?, email=?, password=? WHERE id=?", [
      payload.name,
      payload.email,
      payload.password,
      id,
    ]);

  if (updateUser[0].affectedRows === 1) {
    return res.status(200).json({
      message: "User updated successfully",
    });
  } else {
    return res.status(200).json({
      message: "Request success but user not updated",
    });
  }
});

/* =====================================================
   DELETE USER
===================================================== */

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  /* ---------- Step 1 : Check if user exists ---------- */

  const userFound = await pool
    .promise()
    .query("SELECT * FROM users WHERE id=?", [id]);

  if (userFound[0].length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  /* ---------- Step 2 : Delete user ---------- */

  const delResponse = await pool
    .promise()
    .query("DELETE FROM users WHERE id=?", [id]);

  if (delResponse[0].affectedRows === 1) {
    return res.status(200).json({
      message: "User successfully deleted",
    });
  } else {
    return res.status(200).json({
      message: "Request success, user not deleted",
    });
  }
});

/* -------------------- SERVER -------------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
