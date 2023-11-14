// import dbInit, { addUser } from "./AppDAO";
// import express from "express";
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
     next();   
  });

// Routes which should handle requests
const registerRoute = require("./api/routes/register");
app.use("/signUp", registerRoute);
const userRoutes = require("./api/routes/user");
app.use("/user", userRoutes);
const loginRoutes = require("./api/routes/login");
app.use("/login", loginRoutes);
const appointmentRoute = require("./api/routes/appointment");
app.use("/appointment", appointmentRoute);
const doctorRoute = require("./api/routes/doctor");
app.use("/doctor", doctorRoute);
const patientRoute = require("./api/routes/patient");
app.use("/patient", patientRoute);

module.exports = app;
