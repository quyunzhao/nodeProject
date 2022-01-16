// 导入数据库操作模块
const db = require("../../db");

/** 新用户注册 */
const catesHandler = (req, res) => {
  return res.customSend({ msg: "ok" });
};
// 导出
module.exports = { catesHandler };
