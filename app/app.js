"use strict";

const express = require("express");
const app = express();
const path = require("path");

// 프론트, 서버 ajax 통신 cors 처리
var cors = require("cors");
app.use(cors());

//모듈
const bodyParser = require("body-parser");

const mysql = require("mysql"); // mysql 모듈 로드
const conn = {
  // mysql 접속 설정
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1111",
  database: "mindb",
};

const connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(); // DB 접속

const signUp =
  "INSERT INTO `user` (`id`,`pwd`,`nickname`,`created_date`) VALUES ('test','1111','test','2022-01-03');";

connection.query(signUp, function (err, results, fields) {
  // testQuery 실행
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end();
//라우팅
// const home = require("./src/routes/home");

//앱 세팅
app.set("views", "/src/views/front");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

// 프론트 html 랜더링
app.use(express.static(path.join(__dirname, "/src/views/front")));

// /test로 get 요청하면
app.get("/test", (req, res) => {
  console.log(signUp);

  // json형식 데이터로 응답
  res.json(signUp);
});

// 프론트측이 url 라우팅 처리하도록 설정(SPA, CSR)
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/views/front/index.html"));
});

module.exports = app;
