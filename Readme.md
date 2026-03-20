📘 Backend Practice (Express + MySQL)
🚀 Project Setup

1. Initialize Project
   npm init -y
2. Install Dependencies
   npm install express mysql2 dotenv joi
   Optional (for development)
   npm install nodemon --save-dev
   📦 Dependencies Explained
   Package Purpose
   express Backend framework for APIs
   mysql2 Connect Node.js with MySQL
   dotenv Manage environment variables
   joi Validate request data
   nodemon Auto-restart server during development
   📁 Basic Project Structure
   project/
   │
   ├── node_modules/
   ├── routes/
   │ └── userRoutes.js
   ├── middleware/
   │ └── logger.js
   ├── config/
   │ └── db.js
   ├── .env
   ├── package.json
   ├── index.js
   └── README.md
   ⚙️ Environment Variables (.env)

Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=backend_practice
PORT=3000
🔌 Database Connection (mysql2)
const mysql = require("mysql2");

const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

module.exports = pool;
🧠 Middleware
What is Middleware?

Function that runs before the request reaches route handler

Built-in Middleware
app.use(express.json());

👉 Converts JSON request → req.body

Custom Middleware Example
function logger(req, res, next) {
console.log(req.method, req.url);
next();
}

app.use(logger);
🛣️ Routes
Basic Route Example
app.get("/users", (req, res) => {
res.send("Users route");
});
CRUD Routes
Method Route Purpose
GET /users Get all users
GET /users/:id Get single user
POST /users Create user
PUT /users/:id Update user
DELETE /users/:id Delete user
📥 POST API (Create User)
app.post("/users", (req, res) => {

const { name, email, password } = req.body;

pool.query(
"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
[name, email, password],
(err, result) => {

      if (err) return res.status(500).send("Error");

      res.json({
        message: "User added",
        id: result.insertId
      });

    }

);

});
✏️ PUT API (Update User)
app.put("/users/:id", (req, res) => {

const id = req.params.id;
const { name, email, password } = req.body;

pool.query(
"UPDATE users SET name=?, email=?, password=? WHERE id=?",
[name, email, password, id],
(err, result) => {

      if (err) return res.status(500).send("Error");

      res.json({ message: "User updated" });

    }

);

});
❌ DELETE API
app.delete("/users/:id", (req, res) => {

const id = req.params.id;

pool.query(
"DELETE FROM users WHERE id=?",
[id],
(err, result) => {

      if (err) return res.status(500).send("Error");

      res.json({ message: "User deleted" });

    }

);

});
🔍 Validation using Joi
const Joi = require("joi");

const schema = Joi.object({
name: Joi.string().min(3).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required()
});

Usage:

const { error } = schema.validate(req.body);

if (error) {
return res.status(400).send(error.details[0].message);
}
🔁 Request Flow (Important)
Client (Postman / Frontend)
↓
Middleware (express.json)
↓
Route (API)
↓
Database (MySQL)
↓
Response
🧩 Key Concepts

REST API

Middleware

CRUD operations

SQL queries

Foreign keys

Request/Response cycle

Environment variables

⚠️ Common Errors
Error Reason
req.body undefined Missing express.json()
Cannot delete parent row Foreign key constraint
Connection refused MySQL server not running
🧠 Interview Quick Answers

What is middleware?
→ Function that runs between request and response

What is REST API?
→ Standard way to communicate using HTTP methods

Why use dotenv?
→ To store sensitive data like DB password

📌 Commands Summary
npm init -y
npm install express mysql2 dotenv joi
npm install nodemon --save-dev
🔥 Next Topics to Add Later

JWT Authentication

Password hashing (bcrypt)

MVC structure

Error handling middleware

JOIN queries
