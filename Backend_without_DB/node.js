
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.end("hello world!");
  } else if (url === "/second-path" && method === "GET") {
    res.end("this is second path welcome!");
  } else if (url === "/second-path" && method === "POST") {
    res.end("this is third path welcome!");
  }else { 
    res.end("No end point found!")
  }
   
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
//http://127.0.0.1:3000/second-path

/* 

http is normal connection 
https secure connection

http://localhost:3000
http://127.0.0.1:3000 both are same

http://localhost:3000/users in this users is a endpoint  


const http = require("http"); - Imports Node.js's built-in http module for creating HTTP servers.
http.createServer((req, res) => { ... }) - Creates an HTTP server that listens for incoming requests.
The callback function receives:
req (request object): Contains details like URL and HTTP method.
res (response object): Used to send responses back to the client.
Inside the callback:
Extracts url and method from the request.
Checks for specific GET requests:
"/" → Responds with "hello world!"
"/second-path" → Responds with "this is second path welcome!"
"/third-path" → Responds with "this is third path welcome!"
Uses res.end() to send the response and close the connection.
server.listen(3000, () => { ... }) - Starts the server on port 3000. Logs a message when ready.
To run it: Use node node.js in the terminal. Then visit http://localhost:3000 or 
http://localhost:3000/second-path in a browser to see the responses. This handles only GET requests; 
other methods or paths will result in no response (the connection hangs). For production, add error 
handling and proper routing


GET - to get data from server or database
POST - to send data to server 
PUT - to update data in server
DELETE - to delete data from server



*/