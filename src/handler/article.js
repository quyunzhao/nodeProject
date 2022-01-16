// 导入数据库操作模块
const db = require("../../db");

// 错误码
const {
  error_50000,
  error_50008,
  error_50009,
  error_50010,
  error_50011,
  error_50012,
} = require("../error");

/** 获取文章列表 */
const catesHandler = (req, res) => {
  // 定义 sql
  const sqlStr = `SELECT * FROM ev_article_cate where is_delete=0 order by id asc`;
  // 查询
  db.query(sqlStr, (err, result) => {
    if (err) {
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    return res.customSend({ data: result });
  });
};

/** 新增文章  */
const creatCatesHandler = (req, res) => {
  const { name, alias } = req.body;
  // 定义 sql
  const sqlStr = `SELECT * FROM ev_article_cate where name=?`;
  // 查询 名称是否存在
  db.query(sqlStr, [name], (err, result) => {
    if (err) {
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度不为 0 说明存在相同的值
    if (result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50008 }, 400);
    }
    // 判断别名是否存在
    // 定义 sql
    const sqlAliasStr = `SELECT * FROM ev_article_cate where alias=?`;

    db.query(sqlAliasStr, [alias], (err, result) => {
      if (err) {
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }
      // 长度不为 0 说明存在相同的值
      if (result.length) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50009 }, 400);
      }

      // 插入 sql
      const sqlInsert = `insert into ev_article_cate set ?`;
      // 插入数据库的用户信息
      const info = {
        name,
        alias,
      };
      db.query(sqlInsert, info, (err, result) => {
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
  });
};

/** 删除文章 */
const deleteCatesHandler = (req, res) => {
  const { id } = req.params;

  const sqlStr = `select * from ev_article_cate where id=? and is_delete = 0`;
  db.query(sqlStr, [id], (err, result) => {
    if (err) {
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50010 }, 400);
    }

    // 更新 sql
    const sqlUpdate = `update ev_article_cate set ? where id=?`;
    const info = {
      is_delete: 1,
    };
    db.query(sqlUpdate, [info, id], (err, result) => {
      if (err) {
        /** 调用自定义 send函数  */
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }
      if (result.affectedRows !== 1) {
        return res.customSend({ ...error_50011 }, 500);
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

/** 根据id获取文章列表 */
const catesByIdHandler = (req, res) => {
  const { id } = req.params;
  // 定义 sql
  const sqlStr = `SELECT * FROM ev_article_cate where id=? and is_delete = 0`;
  // 查询
  db.query(sqlStr, [id], (err, result) => {
    if (err) {
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50010 }, 400);
    }
    return res.customSend({ data: result[0] });
  });
};

/** 根据 id 更新文章数据 */
const updateCatesHandler = (req, res) => {
  const { id, name, alias } = req.body;
  // 定义 sql
  const sqlStr = `SELECT * FROM ev_article_cate where id=? and is_delete = 0`;
  // 查询
  db.query(sqlStr, [id], (err, result) => {
    if (err) {
      return res.customSend({ ...error_50000, msg: err.message }, 500);
    }
    // 长度为 0 说明不存在
    if (!result.length) {
      /** 调用自定义 send函数  */
      return res.customSend({ ...error_50010 }, 400);
    }

    // 定义查重语句
    const sql = `SELECT * FROM ev_article_cate where id<>? and (name=? or alias=?)`;

    db.query(sql, [id, name, alias], (err, result) => {
      if (err) {
        return res.customSend({ ...error_50000, msg: err.message }, 500);
      }

      // 名称和别名都被占用
      if (result.length === 2) {
        return res.customSend({ ...error_50012 }, 400);
      }
      if (
        result.length === 1 &&
        result[0].name === name &&
        result[0].alias === alias
      ) {
        return res.customSend({ ...error_50012 }, 400);
      }
      // 名称重复
      if (result.length === 1 && result[0].name === name) {
        return res.customSend({ ...error_50008 }, 400);
      }
      // 别名重复
      if (result.length === 1 && result[0].alias === alias) {
        return res.customSend({ ...error_50009 }, 400);
      }
      // 开始更新
      // 更新 sql
      const sqlUpdate = `update ev_article_cate set ? where id=?`;

      const info = {
        name,
        alias,
      };

      db.query(sqlUpdate, [info, id], (err, result) => {
        if (err) {
          /** 调用自定义 send函数  */
          return res.customSend({ ...error_50000, msg: err.message }, 500);
        }
        if (result.affectedRows !== 1) {
          return res.customSend({ ...error_50011 }, 500);
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
  });
};

// 导出
module.exports = {
  catesHandler,
  creatCatesHandler,
  deleteCatesHandler,
  catesByIdHandler,
  updateCatesHandler,
};
