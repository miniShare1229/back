"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
/*router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
*/
router.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//router.get("/login", ctrl.output.login);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;
