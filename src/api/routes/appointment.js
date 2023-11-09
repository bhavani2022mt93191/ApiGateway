const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const bookingService = process.env.APPOINTMENT_SERVICE;
const verifyToken = require("./auth");
const { send400ErrorResponse, send500ErrorResponse } = require("./utils");

console.log("appointment ser, ", bookingService);

//returns today's appointments 
router.get("/", verifyToken, async (req, res, next) => {
  axios
    .get(`${bookingService}/appointment`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

//returns all doctors scheduled appointments 
router.get("/doctor/:did", verifyToken, async (req, res, next) => {
  const did = req.params.did;
  if (!did) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${bookingService}/appointment/doctor/${did}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

//returns all patient's scheduled appointments 
router.get("/patient/:pid", verifyToken, async (req, res, next) => {
  const pid = req.params.pid;
  if (!pid) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${bookingService}/appointment/patient/${pid}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

router.get("/:appointmentId", verifyToken, (req, res, next) => {
  const bookingId = req.params.appointmentId;
  console.log(bookingId);
  if (!bookingId) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${bookingService}/appointment/${bookingId}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

//Schedule new appointment
router.post("/", verifyToken, (req, res) => {
  try {
    const appDet = req.body;
    if (!appDet || !(appDet.pid && appDet.did)) {
      send400ErrorResponse(res);
      return;
    }
    axios
      .post(`${bookingService}/appointment`, appDet)
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        return send500ErrorResponse(res);
      });
  } catch (error) {
    return send500ErrorResponse(res);
  }
});


router.delete("/:appId",verifyToken, (req, res, next) => {
  const bookingId = req.params.appId;
  if (!bookingId) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .delete(`${bookingService}/appointment/${bookingId}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

module.exports = router;
