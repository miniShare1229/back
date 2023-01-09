"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    //console.log(userInfo);
    return userInfo;
  }
  static getUsers(...fields) {
    //const users = this.#users;
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
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static save(userInfo) {
    //const users = this.#users;
    // users.id.push(userInfo.id);
    // users.name.push(userInfo.name);
    // users.psword.push(userInfo.psword);
  }
}

module.exports = UserStorage;
