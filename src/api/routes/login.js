const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const userService = process.env.USER_SERVICE;

router.post("/", (req, res, next) => {
  axios.post(`${userService}/login`,req.body)
    .then(response => {
            res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
      // Handle errors here
      console.error(error);
      res.status(500).send('An error occurred'); // Send an error response to the client
    });
});

module.exports = router;
