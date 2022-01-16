// 导入错误码
const { error_401, error_50000 } = require("../error");

/**  自定义 全局处理错误 函数 */
const errorHandler = (err, req, res, next) => {
  // 判断错误 是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_401, msg: "权限过期" }, 401);
  }

  if (err) {
    // return res.status(500).send({
    //   code: 500,
    //   data: { data: err.message },
    //   msg: "系统繁忙",
    // });
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50000, msg: err.message }, 500);
  }

  if (err) {
    /** 调用自定义 send函数  */
    return res.customSend({ ...error_50000, msg: err.message }, 500);
  }
};

module.exports = errorHandler;
