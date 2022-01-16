const express = require("express");

//  导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

const router = express.Router();

// 导入校验 规则
const { registerSchema } = require("../schema/user");

// 导入处理函数
const { registerHandler, loginHandler } = require("../handler/user");

/** 注册新用户*/
router.post("/register", expressJoi(registerSchema), registerHandler);

/** 登录 */
router.post("/login", loginHandler);

module.exports = router;
