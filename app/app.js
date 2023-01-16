"use strict";

const express = require("express");
const app = express();
const path = require("path");

// 프론트, 서버 ajax 통신 cors 처리
var cors = require('cors');
app.use(cors());

//모듈
const bodyParser = require("body-parser");

//라우팅
// const home = require("./src/routes/home");

//앱 세팅
app.set("views", "/src/views/front");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

// 프론트 html 랜더링
app.use(express.static(path.join(__dirname, '/src/views/front'))
);

// /test로 get 요청하면
app.get('/test', (req, res)=>{
  console.log("app.get API");
  
  // json형식 데이터로 응답
  res.json({ok: true, test: 123})
})

// 프론트측이 url 라우팅 처리하도록 설정(SPA, CSR) 
app.get('*', function (req, res){
  res.sendFile(path.join(__dirname, '/src/views/front/index.html'));
});

module.exports = app;
