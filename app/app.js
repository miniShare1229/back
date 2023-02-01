"use strict";

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

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
app.use(cookieParser());
app.use(
  // 미들웨어 적용
  session({
    httpOnly: true,
    secure: true,
    secret: "@mi@ni#",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    // cookie: {
    //   httpOnly: true,
    //   secure: true,
    // },
  })
);

// 프론트 html 랜더링
app.use(express.static(path.join(__dirname, "/src/views/front")));

app.post("/register", (req, res) => {
  console.log("회원가입 실행");
  //console.log(req.body);
  const connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(
      "select id, nickname from user where id=?",
      [req.body.id],
      (err, rows) => {
        if (rows.length === 0) {
          const sql = `INSERT INTO user (id, pwd, nickname, created_date) VALUES ('${req.body.id}','${req.body.pwd}','${req.body.nickname}','2022-01-03')`;
          connection.query(sql, function (err, result) {
            if (err) {
              throw err;
            }
            console.log("회원가입 완료");
            res.status(200).json({
              code: 200,
              message: "실패",
            });
          });
        } else {
          console.log("중복된 아이디입니다");
          res.status(409).json({
            code: 409,
            message: "중복된 아이디",
          });
        }
      }
    );
  }); // DB 접속
});

//로그인 기능
app.post("/login", async (req, res) => {
  console.log("로그인 실행");
  const connection = mysql.createConnection(conn);
  connection.connect(function (err) {
    // if (err) throw err;'
    connection.query(
      "select user_id, id, pwd, nickname from user where id=? and pwd=?",
      [req.body.id, req.body.pwd],

      (err, rows) => {
        //console.log(rows[0].nickname);
        if (rows.length === 0) {
          if (err) {
            throw err;
          }
          res.status(404).json({
            code: 404,
            message: "아이디나 비밀번호를 확인해주세요.",
          });
        } else {
          console.log("로그인 성공입니다.");
          console.log(req.session.userid === req.body.id);
          if (req.session.userid === req.body.id) {
            console.log("세션 유지중");
            //return res.json({ message: "session 유지중" });
            console.log(rows);
            return res.status(200).json({
              code: 200,
              message: "세션 유지중",
              user: rows[0].id,
              nickname: rows[0].nickname,
              id: rows[0].user_id,
            });
          }
          req.session.save((error) => {
            if (error) console.log(error);
          });
          req.session.userid = req.body.id;
          console.log(rows);
          res.status(200).json({
            code: 200,
            message: "성공",
            user: rows[0].id,
            nickname: rows[0].nickname,
            id: rows[0].user_id,
          });
        }
      }
    );
  });
});

app.post("/privateSubmit", (req, res) => {
  console.log("privateSubmit 요청");
  console.log(req.body.title);
  console.log(req.body.icon);
  console.log(req.body.content);
  //console.log(req.body);
  const connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(function (err) {
    if (err) throw err;
    connection.query((err, rows) => {
      {
        const sql = `INSERT INTO board (user_id, title, content, icon, created_date) VALUES ('${req.body.userId}', '${req.body.title}','${req.body.icon}','${req.body.content}','2022-01-03')`;
        connection.query(sql, function (err, result) {
          if (err) {
            throw err;
          }
          console.log("글등록 완료");
          res.status(200).json({
            code: 200,
            message: "성공",
          });
        });
      }
    });
  }); // DB 접속
});

app.post("/sharedSubmit", (req, res) => {
  console.log("dddd");
});

// 이름 등록
// app.post("/", (req, res) => {
//   const { name } = req.body;
//   req.session.user = name;
//   res.redirect("/");
// });

//로그아웃 기능
app.get("/delete", (req, res) => {
  console.log("세션 제거");
  console.log("유저 로그아웃 함");
  req.session.destroy();
  res.redirect("/");
});

// 프론트측이 url 라우팅 처리하도록 설정(SPA, CSR)
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/views/front/index.html"));
});

module.exports = app;
