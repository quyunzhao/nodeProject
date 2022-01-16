// 导入 Joi 来定义验证规则
const Joi = require("joi");

//   定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
const demoSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/)
      .required(),
    repassword: Joi.ref("password"),
  },
  // 2.2 校验 req.query 中的数据
  query: {
    name: Joi.string().alphanum().min(3).required(),
    age: Joi.number().integer().min(1).max(100).required(),
  },
  // 2.3 校验 req.params 中的数据
  params: {
    id: Joi.number().integer().min(0).required(),
  },
};

/** 密码校验规则 */
const pwd = Joi.string()
  .pattern(/^[\S]{6,15}$/)
  .required();

/** 用户名校验规则 */
const username = Joi.string().alphanum().min(3).max(12).required();

const registerSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: username,
    password: pwd,
    repassword: Joi.ref("password"),
  },
};

const loginSchema = {
  body: {
    username: username,
    password: pwd,
    repassword: Joi.ref("password"),
  },
};

const modifySchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};

const modifySchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};

const restPasswordSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    newPassword: pwd,
    oldPassword: Joi.not(Joi.ref("newPassword")).concat(pwd),
  },
};

module.exports = {
  registerSchema,
  loginSchema,
  modifySchema,
  restPasswordSchema,
};
