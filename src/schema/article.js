// 导入 Joi 来定义验证规则
const Joi = require("joi");

/** 密码校验规则 */
const pwd = Joi.string()
  .pattern(/^[\S]{6,15}$/)
  .required();

/** 用户名校验规则 */
const username = Joi.string().alphanum().min(3).max(12).required();

module.exports = {};
