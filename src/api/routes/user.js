const express = require("express");
const router = express.Router();
require("dotenv").config();
const userService = require("../../index");
const verifyToken = require("./auth");
const { send400ErrorResponse, send500ErrorResponse } = require("./utils");

//returns user details
router.get("/", verifyToken, async (req, res, next) => {
  axios
    .get(`${userService}/user`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

router.get("/:userId", verifyToken, (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  if (!userId) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .get(`${userService}/user/${userId}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

//Admin adds new user
router.post("/", verifyToken, (req, res) => {
  try {
    const user = req.body;
    if (!user || !(user.name && user.email && user.type)) {
      send400ErrorResponse(res);
      return;
    }
    console.log("new user", user)
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

//update user info by admin
router.put("/", verifyToken, (req, res, next) => {
  try {
    const user = req.body;
    if (!user || !(user.id && user.name && user.email)) {
      send400ErrorResponse(res);
    }

    axios
      .put(`${userService}/user`, user)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        return send500ErrorResponse(res);
      });
  } catch (error) {
    send500ErrorResponse(res);
  }
});

router.delete("/:userId",verifyToken, (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    send400ErrorResponse(res);
    return;
  }
  axios
    .delete(`${userService}/user/${userId}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return send500ErrorResponse(res);
    });
});

module.exports = router;
