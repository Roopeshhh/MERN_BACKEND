const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// This middleware allows Express to read JSON body from requests
app.use(express.json());


/* -------------------- DATABASE CONNECTION -------------------- */

const pool = mysql.createPool({
  host: "localhost",
  user: "dbadmin",
  password: "demo1234",
  database: "demo_db",
});


/* =========================================================
   GET ALL USERS
   ========================================================= */

app.get("/users", async (req, res) => {

  try {

    // Fetch all users from database
    const [users] = await pool.query("SELECT * FROM users");

    // Send response
    return res.status(200).json({
      data: users,
      message: "Successfully users are fetched",
    });

  } catch (err) {

    console.log(err);

    return res.status(500).send("An error has occurred!");

  }

});


/* =========================================================
   GET USER BY EMAIL
   ========================================================= */

app.get("/users/:email", async (req, res) => {

  try {

    // Get email from URL parameter
    const email = req.params.email;

    // Fetch user with that email
    const [userResp] = await pool.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    // If user exists
    if (userResp.length > 0) {

      return res.status(200).json({
        data: userResp,
        message: "Successfully user is fetched",
      });

    } else {

      return res.status(404).json({
        message: "User not found",
      });

    }

  } catch (err) {

    console.log(err);

    return res.status(500).send("An error has occurred!");

  }

});


/* =========================================================
   CREATE USER
   ========================================================= */

app.post("/users", async (req, res) => {

  try {

    // Get data from request body
    const payload = req.body;

    /* -------- STEP 1 : Check if email already exists -------- */

    const [findUser] = await pool.query(
      "SELECT * FROM users WHERE email=?",
      [payload.email]
    );

    if (findUser.length > 0) {

      return res.status(400).json({
        message: "User is already there please try with different email",
      });

    }

    /* -------- STEP 2 : Insert user -------- */

    const [createResponse] = await pool.query(
      "INSERT INTO users(name,email,password) VALUES (?,?,?)",
      [payload.name, payload.email, payload.password]
    );

    // Check if user created
    if (createResponse.affectedRows === 1) {

      return res.status(200).json({
        message: "User has been created successfully",
      });

    } else {

      return res.status(200).json({
        message: "Request was successful but user not created",
      });

    }

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "An error occurred",
    });

  }

});


/* =========================================================
   UPDATE USER
   ========================================================= */

app.put("/users/:id", async (req, res) => {

  try {

    const id = req.params.id;
    const payload = req.body;

    /* -------- STEP 1 : Check if user exists -------- */

    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE id=?",
      [id]
    );

    if (userFound.length === 0) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    /* -------- STEP 2 : Update user -------- */

    const [updateResponse] = await pool.query(
      "UPDATE users SET name=?, email=?, password=? WHERE id=?",
      [payload.name, payload.email, payload.password, id]
      
    );

    if (updateResponse.affectedRows === 1) {

      return res.status(200).json({
        message: "User updated successfully",
      });

    } else {

      return res.status(200).json({
        message: "Request success but user not updated",
      });

    }

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "An error occurred",
    });

  }

});


/* =========================================================
   DELETE USER
   ========================================================= */

app.delete("/users/:id", async (req, res) => {

  try {

    const id = req.params.id;

    /* -------- STEP 1 : Check if user exists -------- */

    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE id=?",
      [id]
    );

    if (userFound.length === 0) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    /* -------- STEP 2 : Delete user -------- */

    const [delResponse] = await pool.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    if (delResponse.affectedRows === 1) {

      return res.status(200).json({
        message: "User successfully deleted",
      });

    } else {

      return res.status(200).json({
        message: "Request success, user not deleted",
      });

    }

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "An error occurred",
    });

  }

});


/* -------------------- SERVER -------------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});