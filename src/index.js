const http = require('http');
const app = require('./services');
require("dotenv").config();
const port = process.env.API_GATEWAY_SERVICE_PORT || 3001

const userService = process.env.USER_SERVICE || "http://localhost:3002"
const appointmentService = process.env.APPOINTMENT_SERVICE || "http://localhost:3004"

console.log("port: ", port )

//App.js contains the code to process the http request and send the response
const server = http.createServer(app);

server.listen(port, () => { 
    console.log(`Server running at ${port}`); 
});

module.exports={userService, appointmentService}