const express = require("express");

//  导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

const router = express.Router();

// 导入校验 规则
const { creatCatesSchema, deleteCatesSchema } = require("../schema/article");

// 导入处理函数
const {
  catesHandler,
  creatCatesHandler,
  deleteCatesHandler,
} = require("../handler/article");

/** 文章列表 */
router.get("/cates", catesHandler);

/** 新增文章 */
router.post("/creatCates", expressJoi(creatCatesSchema), creatCatesHandler);

/** 删除文章 */
router.delete(
  "/deleteCates/:id",
  expressJoi(deleteCatesSchema),
  deleteCatesHandler
);

// 导出模块
module.exports = router;
