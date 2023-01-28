"use strict";

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

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

//라우팅
// const home = require("./src/routes/home");

//앱 세팅
app.set("views", "/src/views/front");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", home); // use -> 미들웨어를 등록해주는 메서드
app.use(
  // 미들웨어 적용
  session({
    httpOnly: true,
    secure: true,
    secret: "@mi@ni#",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
    },
  })
);

// 프론트 html 랜더링
app.use(express.static(path.join(__dirname, "/src/views/front")));

app.post("/register", (req, res) => {
  //console.log(req.body);
  const connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(function (err) {
    if (err) throw err;
    //console.log("Connected");
    const sql = `INSERT INTO user (id, pwd, nickname, created_date) VALUES ('${req.body.id}','${req.body.pwd}','${req.body.nickname}','2022-01-03')`;
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("회원가입 완료");
    });
  }); // DB 접속

  //connection.end();
  // console.log(signUp);

  // json형식 데이터로 응답
  res.json();
});

//로그인 기능
app.post("/login", async (req, res) => {
  console.log("로그인 실행");
  const connection = mysql.createConnection(conn);
  connection.connect(function (err) {
    // if (err) throw err;'
    connection.query(
      "select id, pwd, nickname from user where id=? and pwd=?",
      [req.body.id, req.body.pwd],
      (err, rows) => {
        if (rows.length === 0) {
          if (err) {
            throw err;
          }
          res.status(400).json({
            code: 400,
            message: "실패",
          });
        } else {
          //console.log((req.session.user = rows[0]));
          res.status(200).json({
            code: 200,
            message: "성공",
            body: rows[0].constructor.nickname,
          });
        }
      }
    );
  });
});

// 프론트측이 url 라우팅 처리하도록 설정(SPA, CSR)
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/views/front/index.html"));
});

module.exports = app;
