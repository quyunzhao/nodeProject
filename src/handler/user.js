// 导入数据库操作模块
const db = require("../../db");

// 密码加密
const bcrypt = require("bcryptjs");

const { error_50001, error_50000, error_50002 } = require("../error");

/** 新用户注册*/
const registerHandler = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50001, msg: "hhh" }, 400);
  }

  // 定义sql 语句查询用户名是否被占用
  const sqlStr = `select * from ev_users where username=?`;

  db.query(sqlStr, [username], (err, result) => {
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度不为 0 说明存在相同的值
    if (result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50002 }, 400);
    }
    // 加密密码
    const pwd = bcrypt.hashSync(password, 10);
    // 插入用户sql
    const sqlInsert = `insert into ev_users set ?`;
    // 插入数据库的用户信息
    const userInfo = {
      username,
      password: pwd,
    };

    db.query(sqlInsert, userInfo, (err, result) => {
      if (err) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }
      if (result.affectedRows !== 1) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50000 }, 500);
      }

      // 最后进行成功返回
      /** 调用自定义 send函数  */
      return res.customSend({ msg: "ok" });
    });
  });
};

/** 登录*/
const loginHandler = (req, res) => {
  const data = {
    msg: "ok",
    data: {
      token: "",
    },
  };

  /** 调用自定义 send函数  */
  return res.customSend(data);
};

module.exports = { registerHandler, loginHandler };
