// 导入 Joi 来定义验证规则
const Joi = require("joi");

/**  新增文章规则 */
const creatCatesSchema = {
  body: {
    name: Joi.string().required(),
    alias: Joi.string().required(),
  },
};

/** 删除文章 */
const deleteCatesSchema = {
  params: {
    id: Joi.number().integer().min(1).required(),
  },
};

// 导出
module.exports = { creatCatesSchema, deleteCatesSchema };
