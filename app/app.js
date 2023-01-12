"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//라우팅
const home = require("./src/routes/home");
const path = require("path");

//앱 세팅
app.set("views", "./src/views/home/");

app.set("view engine", "ejs");
//app.set("view engine", "jsx");
//app.engine("jsx", require("express-react-views").createEngine());

app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}/src/routes/asset/`));
app.use(express.static(path.join(__dirname, "/src/routes/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;
