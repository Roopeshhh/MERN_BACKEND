const express = require("express");
require("dotenv").config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

/* -------------------- ROUTES -------------------- */

// import user routes
const userRoutes = require("./routes/userRoutes");

// base route
app.use("/users", userRoutes);

/* -------------------- SERVER -------------------- */

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
