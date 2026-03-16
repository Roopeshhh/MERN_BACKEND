// Step 1: Install express
// Run in terminal: npm init -y && npm install express

// Step 2: Create index.js
const express = require('express');

const app = express();

//middleware
app.use(express.json());

let users = [{id: "01",name: "Roopesh"},{id: "02",name: "Jeevan"}]
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// GET
app.get('/users', (req, res) => {
  res.send(users);
});


//POST
app.post('/users', (req, res) => {
    console.log("************ req.body *********" , req.body);
    // console.log(users);
    users.push(req.body);
    
  res.send(users);
});


// PUT
app.put('/users', (req, res) => {

  console.log("req.body:", req.body);

  const id = req.body.id;

  const newUsers = users.map((user) => {
    if (user.id == id) {
      return req.body;
    } else {
      return user;
    }
  });

  users = newUsers; 

  res.send(users);
});

// delete
app.delete('/users', (req, res) => {

  console.log("req.body:", req.body);

  const id = req.body.id;

  const newUsers = users.filter((user) => id != user.id);

  users = newUsers; 

  res.send(users);
});



// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



// nodemon to run code on every save or changes => npm i -g nodemon  
// to run nodemon filename
// api endpoints
// path parameters => query and path parameters

// object called body, params

/* 
1. node server using http and expressjs
2 http methods
3 GET-to fetch
4 PUT-to update whole record
5 POST-add new record
6 DELETE- delete record

http://localhost:3000/users
http= Hypertext Transfer Protocol

localhost:3000 = base url
/users = api endpoint/PATH


API concepts:
headers= describes the request, i.e content-type header
/users/:id= path parameter, present in req.params property of request
/users?a=b = query parameters, present in req.query property of request
req.body= for payload sent as json in request
use of body parser: app.use(express.json())| I */