"use strict";

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};
const users = {
  id: ["홍길동", "임꺽정", "개발"],
  psword: ["1234", "1234", "1234"],
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.psword[idx] === psword) {
        return res.json({
          success: true,
        });
      } //inner if
    } //outer if
    return res.json({
      success: false,
      msg: "로그인에 실패했습니다",
    });
  },
};

module.exports = {
  output,
  process,
};
