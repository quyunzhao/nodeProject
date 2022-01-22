const express = require("express");

//  导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

const router = express.Router();

// 导入校验 规则
const {
  creatCatesSchema,
  deleteCatesSchema,
  catesByIdSchema,
  updateCatesSchema,
  addSchema,
} = require("../schema/article");

// 导入处理函数
const {
  catesHandler,
  creatCatesHandler,
  deleteCatesHandler,
  catesByIdHandler,
  updateCatesHandler,
  addCatesHandler,
  formDataHandler,
} = require("../handler/article");

/** 文章列表 */
router.get("/cates", catesHandler);

/** 新增文章分类 */
router.post("/creatCates", expressJoi(creatCatesSchema), creatCatesHandler);

/** 删除文章分类 */
router.delete(
  "/deleteCates/:id",
  expressJoi(deleteCatesSchema),
  deleteCatesHandler
);

/** 根据id获取文章分类列表 */
router.get("/cates/:id", expressJoi(catesByIdSchema), catesByIdHandler);

/** 根据 id 更新文章分类数据 */
router.post("/updateCates", expressJoi(updateCatesSchema), updateCatesHandler);

/** 发布文章 */
router.post("/add", expressJoi(addSchema), addCatesHandler);

/** formData */
router.post("/formData", formDataHandler);

// 导出模块
module.exports = router;
