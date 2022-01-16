// 导入 Joi 来定义验证规则
const Joi = require("joi");

// 导入错误码
const { error_401, error_50000, error_50003 } = require("../error");

/**  自定义 全局处理错误 函数 */
const errorHandler = (err, req, res, next) => {
  // 判断错误 是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_401, msg: "权限过期" }, 401);
  }

  //   Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50003, msg: err.message }, 400);
  }

  if (err) {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50000, msg: err.message }, 500);
  }
};

module.exports = errorHandler;
