const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "backend_practice",
});

// fetch all users
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).send("Database error");
    }

    res.json(result);
  });
});

// fetch user by email
app.get("/users/:email", (req, res) => {
  const email = req.params.email;

  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.json(result);
  });
});

// add new user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error inserting user");
      }

      res.json({
        message: "User added successfully",
        userId: result.insertId,
      });
    },
  );
});

//PUT
// update user by id
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  pool.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
    [name, email, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error updating user");
      }

      res.json({
        message: "User updated successfully",
        affectedRows: result.affectedRows,
      });
    },
  );
});

//delete
// delete user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting user");
    }

    res.json({
      message: "User deleted successfully",
      affectedRows: result.affectedRows,
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
/* Dbeaver for connecting database 


in order to connect sql in dbeaver run this command or install in vs code 
ie npm install mysql2

joi package as a middleware
go to npm website and search for joi


prepared statements

uuid

sql injection 

status code

aync package => async waterfall model


wild card matching => like 
*/
