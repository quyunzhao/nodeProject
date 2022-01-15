const mysql = require("mysql");

const { host, user, password, database } = require("../config/cfg.json");

const db = mysql.createPool({
  host,
  user,
  password,
  database,
});

// 测试 mysql 是否连接正常
// db.query("select * from ev_users", (err, result) => {
//   if (err) {
//     console.log(err.message);
//     return err;
//   }
//   console.log(result);
// });

module.exports = db;
