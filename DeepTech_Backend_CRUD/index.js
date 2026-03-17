const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

/* -------------------- DATABASE CONNECTION -------------------- */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "backend_practice"
});

/* -------------------- GET ALL USERS -------------------- */

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send("An error has occurred!");
    }

    return res.json(result);
  });
});

/* -------------------- GET USER BY EMAIL -------------------- */

app.get("/users/:email", (req, res) => {
  const email = req.params.email;

  pool.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).send("An error has occurred!");
      }

      if (result.length > 0) {
        return res.status(200).json({
          data: result,
          message: "Successfully user is fetched",
        });
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    }
  );
});

/* -------------------- CREATE USER -------------------- */

app.post("/users", (req, res) => {
  const payload = req.body;

  pool.query(
    "SELECT * FROM users WHERE email=?",
    [payload.email],
    (err, result) => {
      if (err) {
        return res.status(500).send("An error has occurred!");
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User with given email already exists!",
        });
      }

      pool.query(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [payload.name, payload.email, payload.password],
        (err, result) => {
          if (err) {
            return res.status(500).send("An error has occurred!");
          }

          if (result.affectedRows === 1) {
            return res.status(200).json({
              message: "User has been created successfully",
            });
          } else {
            return res.status(200).json({
              message: "Request was successful but user not created",
            });
          }
        }
      );
    }
  );
});

/* -------------------- UPDATE USER -------------------- */

app.put("/users/:id", (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  pool.query(
    "SELECT * FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).send("An error has occurred!");
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      pool.query(
        "UPDATE users SET name=?, email=?, password=? WHERE id=?",
        [payload.name, payload.email, payload.password, id],
        (err, result) => {
          if (err) {
            return res.status(500).send("An error has occurred!");
          }

          if (result.affectedRows === 1) {
            return res.status(200).json({
              message: "User has been updated successfully",
            });
          } else {
            return res.status(200).json({
              message: "Request was successful but user not updated",
            });
          }
        }
      );
    }
  );
});

/* -------------------- DELETE USER -------------------- */

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  pool.query(
    "SELECT * FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).send("An error has occurred!");
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      pool.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err, result) => {
          if (err) {
            return res.status(500).send("An error has occurred!");
          }

          if (result.affectedRows === 1) {
            return res.status(200).json({
              message: "User has been deleted successfully",
            });
          } else {
            return res.status(200).json({
              message: "Request was successful but user not deleted",
            });
          }
        }
      );
    }
  );
});

/* -------------------- SERVER -------------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});