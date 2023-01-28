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
/*
app.post("/register", (req, res) => {
  // console.log("성공");
  // console.log("res:::::", res);
  console.log(req.body);
  const connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(function (err) {
    if (err) throw err;
    //console.log("Connected");
    const sql = `INSERT INTO user (id, pwd, nickname, created_date) VALUES ('${req.body.id}','${req.body.pwd}','${req.body.nickname}','2022-01-03')`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }); // DB 접속

  //connection.end();
  // console.log(signUp);

  // json형식 데이터로 응답
  res.json();
});
*/
//로그인 기능
app.post("/login", (req, res) => {
  //const id = req.body.id;
  // const pwd = req.body.pwd;
  const connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(function (err) {
    // if (err) throw err;'
    connection.query("select id, pwd, nickname from user", (err, rows) => {
      if (err) {
        throw err;
      } else {
        for (let i = 0; i < rows.length; i++) {
          if (req.body.id === rows[i].id && req.body.pwd === rows[i].pwd) {
            console.log("ok");
            return res.status(200).json({
              code: 200,
              message: "성공",
            });
          } else {
            //else 시 로직작성
            console.log("아이디 비밀번호를 다시확인해주세요");
            // return res.status(200).json({
            //   code: 200,
            //   message: "성공",
            // });
          }
        }
        //return res.send();
      }
    });
  }); // DB 접속

  // json형식 데이터로 응답
  //res.json();
});

// 프론트측이 url 라우팅 처리하도록 설정(SPA, CSR)
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/views/front/index.html"));
});

module.exports = app;
