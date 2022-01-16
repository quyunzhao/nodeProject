// 导入 Joi 来定义验证规则
const Joi = require("joi");

/**  新增文章分类规则 */
const creatCatesSchema = {
  body: {
    name: Joi.string().required(),
    alias: Joi.string().required(),
  },
};

/** 删除文章分类 */
const deleteCatesSchema = {
  params: {
    id: Joi.number().integer().min(1).required(),
  },
};

/** 根据id获取文章分类列表 */
const catesByIdSchema = {
  params: {
    id: Joi.number().integer().min(1).required(),
  },
};

/** 根据 id 更新文章分类数据 */
const updateCatesSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    alias: Joi.string().required(),
  },
};

// 导出
module.exports = {
  creatCatesSchema,
  deleteCatesSchema,
  catesByIdSchema,
  updateCatesSchema,
};
