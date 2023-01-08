"use strict";

//프론트단에서 동작

const id = document.querySelector("#id"),
  psword = document.querySelector("#password"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.sucess) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      // 경로 실패시 error
      console.error("로그인 중 에러발생");
    });
}
