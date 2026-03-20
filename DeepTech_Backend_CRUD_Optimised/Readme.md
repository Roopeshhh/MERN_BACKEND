✅ STEP 1 — Initialize Project
Run: npm init -y

✅ STEP 2 — Install Required Packages
Run: npm install express mysql2 dotenv

Package Why
express: backend server
mysql2: DB connection
dotenv: hide credentials

✅ STEP 3 — Create Folder Structure
project/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── userController.js
│
├── routes/
│ └── userRoutes.js
│
├── .env
├── index.js
├── package.json

Folder Responsibility
config DB connection
controllers business logic
routes API endpoints
index.js app entry point

✅ STEP 4 — Move DB Connection to config/db.js
Update .env with Your Credentials

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=backend_practice
PORT=3000

🧠 Why .env?

Right now you had:

password: "demo1234"

❌ Problem:

password exposed in code

not secure

bad practice

✔ Solution:
Use .env → keep secrets outside code

Concept Meaning
dotenv loads .env variables
process.env access env values
createPool connection pool (best practice)
module.exports reuse in other files

🔥 Important Understanding
Before:
index.js → DB connection

After:
db.js → DB connection
index.js → just uses it

✅ STEP 5 — Create Controller (controllers/userController.js)
Move all your business logic (CRUD) out of index.js
🧠 What You Just Did (VERY IMPORTANT)
Before:
index.js = routes + logic + DB

After:
controllers = logic
routes = routing
index.js = app setup

👉 This is called: Separation of Concerns

🧠 What is happening here
Before:
app.get("/users", logic)
Now:
router.get("/", getAllUsers)

👉 Route only handles URL + method

✅ STEP 6 — Create Routes (routes/userRoutes.js)
👉 Logic is handled in controller
Routes = entry point
Controllers = brain
DB = storage

index.js → app setup
routes → API endpoints
controllers → logic
config → DB
.env → secrets

Install Required Packages
npm install bcrypt
npm install jsonwebtoken

---

Authentication and Authorisation

Authentication:
Cryptography = To hide password or make it private using encryption
stages => plain text => ciper text => plain text

There is 3 types of encryption
1.symmetric encription => has only 1 key which does both encryption and decryption
2.Asymmetric encryption => has pair of keys, private and public, here public is key is used fro encryption and
private key for decryption
3.Hash functions => demopass=>where plain text is sent to one crypto funcntion/algo, which gives only cipertext we cannot decrypt back to the normal plain text

websites = cryptotools.net

npm i bcrypt

login using credential is called authentication

Authorisation:
The access you have, permmissions etc

JWT
npm i jsonwebtoken

token
