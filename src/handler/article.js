// 导入数据库操作模块
const db = require("../../db");

// 错误码
const { error_50000 } = require("../error");

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
// 导出
module.exports = { catesHandler };
