const express = require("express");
require("dotenv").config();
const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

/* -------------------- ROUTES -------------------- */

// import user routes
const userRoutes = require("./routes/userRoutes");

// base route
app.use(userRoutes);

/* -------------------- SERVER -------------------- */

//debug
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
