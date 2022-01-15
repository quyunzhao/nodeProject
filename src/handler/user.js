// 导入数据库操作模块

const db = require("../../db");

/** 新用户注册*/
const registerHandler = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      code: "register",
      data: {},
      msg: "用户名或密码不能为空！",
    });
  }

  // 定义sql 语句查询用户名是否被占用
  const sqlStr = `select * from ev_users where username=?`;

  db.query(sqlStr, [username], (err, result) => {
    if (err) {
      res.status(400).send({
        code: "register",
        data: {},
        msg: err.message,
      });
    }
    if (!result) {
      res.status(500).send({
        code: "register",
        data: {},
        msg: "用户存在！",
      });
    }
    // 插入用户
    // 加密密码

    // 最后进行成功返回
    res.send({
      code: "register",
      data: {},
      msg: "ok",
    });
  });

  // res.send({
  //   code: "register",
  //   data: { data: "" },
  //   msg: "注册新用户",
  // });
};

/** 登录*/
const loginHandler = (req, res) => {
  res.send({
    code: "login",
    data: { data: "" },
    msg: " ",
  });
};

module.exports = { registerHandler, loginHandler };
