// 导入数据库操作模块
const db = require("../../db");

// 密码加密
const bcrypt = require("bcryptjs");

// 导入 jwt 加密包
const jwt = require("jsonwebtoken");

// 导入密钥
const { secretKey, expiresIn } = require("../../config");

const {
  error_50000,
  error_50001,
  error_50002,
  error_50004,
  error_50005,
  error_50006,
  error_50007,
} = require("../error");

/** 新用户注册 */
const registerHandler = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50001 }, 400);
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

/** 登录 */
const loginHandler = (req, res) => {
  // 查询用户是否存在
  const { username, password } = req.body;

  // 定义sql 语句查询用户名是否存在
  const sqlStr = `select * from ev_users where username=?`;

  db.query(sqlStr, username, (err, result) => {
    // 执行失败
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在用户
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50004 }, 400);
    }

    // 判断密码是否正确
    // 比较密码 相同返回 true
    const pwdCompare = bcrypt.compareSync(password, result[0].password);

    // 不一致
    if (!pwdCompare) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50005 }, 400);
    }

    // 生成 jwt 的 token
    // 会自动挂载到 req.user 上
    const token =
      "Bearer " +
      jwt.sign({ username, id: result?.[0]?.id }, secretKey, { expiresIn });

    const data = {
      msg: "ok",
      data: {
        token,
      },
    };

    /** 调用自定义 send函数  */
    return res.customSend(data);
  });
};

/** 用户详情信息 */
const userInfoHandler = (req, res) => {
  const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`;

  db.query(sqlStr, req?.user?.id, (err, result) => {
    // 执行失败
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }

    // 长度为 0 说明不存在用户
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_401 }, 401);
    }

    const data = {
      msg: "ok",
      data: result[0],
    };

    /** 调用自定义 send函数  */
    return res.customSend(data);
  });
};

/** 修改用户信息 */
const modifyUserHandler = (req, res) => {
  const { nickname, email, id } = req.body;

  const userInfo = {
    nickname,
    email,
    id,
  };

  const sqlStr = `update ev_users set ? where id=?`;

  db.query(sqlStr, [userInfo, id], (err, result) => {
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    if (result.affectedRows !== 1) {
      return res.customSend({ ...error_50006 }, 500);
    }

    // 更新成功
    const data = {
      msg: "ok",
      data: {},
    };
    /** 调用自定义 send函数  */
    return res.customSend(data);
  });
};

/** 修改用户密码 */
const restPasswordHandler = (req, res) => {
  const { newPassword, oldPassword, id } = req.body;

  const sqlStr = `select * from ev_users where id=?`;

  // 根据id 查询用户信息
  db.query(sqlStr, [id], (err, result) => {
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在该用户
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50004 }, 400);
    }
    // 查询用户成功
    // 比较旧密码是否和数据库一致
    // 比较密码 相同返回 true
    const pwdCompare = bcrypt.compareSync(oldPassword, result[0].password);
    // 不一致
    if (!pwdCompare) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50007 }, 400);
    }

    // 密码一致开始更新
    // 加密密码
    const pwd = bcrypt.hashSync(newPassword, 10);

    const userInfo = {
      password: pwd,
    };

    //  更新用户sql
    const sqlUpdate = `update ev_users set ? where id=?`;

    db.query(sqlUpdate, [userInfo, id], (err, result) => {
      if (err) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }
      if (result.affectedRows !== 1) {
        return res.customSend({ ...error_50006 }, 500);
      }
      // 更新成功
      const data = {
        msg: "ok",
        data: {},
      };
      /** 调用自定义 send函数  */
      return res.customSend(data);
    });
  });
};

/** 修改用户图像 */
const avatarHandler = (req, res) => {
  const { avatar, id } = req.body;

  // 先查询用户
  const sqlStr = `select * from ev_users where id=?`;
  db.query(sqlStr, [id], (err, result) => {
    if (err) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在该用户
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50004 }, 400);
    }
    // 查询用户成功
    const userInfo = {
      user_pic: avatar,
    };
    // 定义sql
    const sqlUpdate = `update ev_users set ? where id=?`;

    db.query(sqlUpdate, [userInfo, id], (err, result) => {
      if (err) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }
      if (result.affectedRows !== 1) {
        return res.customSend({ ...error_50006 }, 500);
      }
      // 更新成功
      const data = {
        msg: "ok",
        data: {},
      };
      /** 调用自定义 send函数  */
      return res.customSend(data);
    });
  });
};

// 导出
module.exports = {
  registerHandler,
  loginHandler,
  userInfoHandler,
  modifyUserHandler,
  restPasswordHandler,
  avatarHandler,
};
