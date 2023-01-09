"use strict";

class UserStorage {
  static #users = {
    //#붙여서 외부에서 접근불가 데이터 은닉화 작업
    id: ["홍길동", "임꺽정", "개발"],
    psword: ["1234", "1234", "1234"],
    name: ["기린", "하마", "코끼리"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    //reduce로 쪼개기
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
  }
}

module.exports = UserStorage;
