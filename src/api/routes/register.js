const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const userService = process.env.USER_SERVICE;
const { send400ErrorResponse, send500ErrorResponse } = require("./utils");

//new patient can registers via this end point
router.post("/", (req, res) => {
  try {
    const user = req.body;
    if (!user || !(user.name && user.email && user.type)) {
      send400ErrorResponse(res);
      return;
    }
    axios
      .post(`${userService}/user`, user)
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        return send500ErrorResponse(res);
      });
  } catch (error) {
    console.log("error", error);
    return send500ErrorResponse(res);
  }
});

module.exports = router;
