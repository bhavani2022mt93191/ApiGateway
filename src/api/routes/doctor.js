const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const bookingService = process.env.APPOINTMENT_SERVICE;
const verifyToken = require("./auth");
const { send400ErrorResponse, send500ErrorResponse } = require("./utils");

//returns all doctors scheduled appointments from past months
router.get("/:did/appointments", verifyToken, async (req, res, next) => {
  const did = req.params.did;
  const pastMonthsCnt = req.query?.pastMonths || 0;
  if (!did) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${bookingService}/appointment/doctor/${did}?pastMonths=${pastMonthsCnt}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});


module.exports = router;
