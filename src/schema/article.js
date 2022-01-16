// 导入 Joi 来定义验证规则
const Joi = require("joi");

/** 注册新用户规则 */
const creatCatesSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    name: Joi.string().required(),
    alias: Joi.string().required(),
  },
};

// 导出
module.exports = { creatCatesSchema };
