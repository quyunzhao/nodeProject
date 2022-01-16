const express = require("express");

//  导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

const router = express.Router();

// 导入校验 规则
// const {

// } = require("../schema/article");

// 导入处理函数
const { catesHandler } = require("../handler/article");

/** 文章 */
router.get("/cates", catesHandler);

// 导出模块
module.exports = router;
