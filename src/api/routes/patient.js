const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const bookingService = process.env.APPOINTMENT_SERVICE;
const verifyToken = require("./auth");
const { send400ErrorResponse, send500ErrorResponse } = require("./utils");

//returns all doctors scheduled appointments from past months
router.get("/:pid/appointments", verifyToken, async (req, res, next) => {
  const pid = req.params.pid;
  const pastMonthsCnt = req.query?.pastMonths || 0;
  if (!pid) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${bookingService}/appointment/patient/${pid}?pastMonths=${pastMonthsCnt}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});


module.exports = router;
