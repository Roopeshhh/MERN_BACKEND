const express = require("express");
const mysql = require("mysql2");
const async = require("async");

const app = express();

app.use(express.json()); // middleware to read JSON body

/* -------------------- DATABASE CONNECTION -------------------- */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "backend_practice"
});


/* =========================================================
   GET ALL USERS
   ========================================================= */

app.get("/users", (req, res) => {

  async.waterfall([

    // Step 1 → Fetch all users from database
    function(callback){

      pool.query("SELECT * FROM users", (err, result) => {

        if(err){
          return callback({status:500, message:"Database error"});
        }

        // send result to next step
        callback(null, result);

      });

    }

  ],

  // Final response
  function(err, result){

    if(err){
      return res.status(err.status).json({message:err.message});
    }

    return res.status(200).json({
      message:"Users fetched successfully",
      data:result
    });

  });

});


/* =========================================================
   GET USER BY EMAIL
   ========================================================= */

app.get("/users/:email", (req, res) => {

  const email = req.params.email;

  async.waterfall([

    // Step 1 → Find user by email
    function(callback){

      pool.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, result) => {

          if(err){
            return callback({status:500,message:"Database error"});
          }

          // if user not found
          if(result.length === 0){
            return callback({status:404,message:"User not found"});
          }

          // pass user data
          callback(null,result);

        }
      );

    }

  ],

  // Final response
  function(err,result){

    if(err){
      return res.status(err.status).json({message:err.message});
    }

    return res.status(200).json({
      message:"User fetched successfully",
      data:result
    });

  });

});


/* =========================================================
   CREATE USER
   ========================================================= */

app.post("/users",(req,res)=>{

  const payload = req.body;

  async.waterfall([

    // Step 1 → Check if email already exists
    function(callback){

      pool.query(
        "SELECT * FROM users WHERE email=?",
        [payload.email],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Database error"});
          }

          if(result.length>0){
            return callback({status:400,message:"User already exists"});
          }

          callback(null);

        }
      );

    },

    // Step 2 → Insert new user
    function(callback){

      pool.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [payload.name,payload.email,payload.password],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Insert error"});
          }

          if(result.affectedRows === 1){
            callback(null,{status:201,message:"User created successfully"});
          }else{
            callback(null,{status:200,message:"User not created"});
          }

        }
      );

    }

  ],

  // Final response
  function(err,result){

    if(err){
      return res.status(err.status).json({message:err.message});
    }

    return res.status(result.status).json({message:result.message});

  });

});


/* =========================================================
   UPDATE USER
   ========================================================= */

app.put("/users/:id",(req,res)=>{

  const id = req.params.id;
  const payload = req.body;

  async.waterfall([

    // Step 1 → Check if user exists
    function(callback){

      pool.query(
        "SELECT * FROM users WHERE id=?",
        [id],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Database error"});
          }

          if(result.length === 0){
            return callback({status:404,message:"User not found"});
          }

          callback(null);

        }
      );

    },

    // Step 2 → Update user data
    function(callback){

      pool.query(
        "UPDATE users SET name=?,email=?,password=? WHERE id=?",
        [payload.name,payload.email,payload.password,id],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Update error"});
          }

          if(result.affectedRows === 1){
            callback(null,{status:200,message:"User updated successfully"});
          }else{
            callback(null,{status:200,message:"User not updated"});
          }

        }
      );

    }

  ],

  // Final response
  function(err,result){

    if(err){
      return res.status(err.status).json({message:err.message});
    }

    return res.status(result.status).json({message:result.message});

  });

});


/* =========================================================
   DELETE USER
   ========================================================= */

app.delete("/users/:id",(req,res)=>{

  const id = req.params.id;

  async.waterfall([

    // Step 1 → Check if user exists
    function(callback){

      pool.query(
        "SELECT * FROM users WHERE id=?",
        [id],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Database error"});
          }

          if(result.length === 0){
            return callback({status:404,message:"User not found"});
          }

          callback(null);

        }
      );

    },

    // Step 2 → Delete user
    function(callback){

      pool.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err,result)=>{

          if(err){
            return callback({status:500,message:"Delete error"});
          }

          if(result.affectedRows === 1){
            callback(null,{status:200,message:"User deleted successfully"});
          }else{
            callback(null,{status:200,message:"User not deleted"});
          }

        }
      );

    }

  ],

  // Final response
  function(err,result){

    if(err){
      return res.status(err.status).json({message:err.message});
    }

    return res.status(result.status).json({message:result.message});

  });

});


/* -------------------- SERVER -------------------- */

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});