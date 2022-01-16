const express = require("express");

//  导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

const router = express.Router();

// 导入校验 规则
const {
  registerSchema,
  loginSchema,
  modifySchema,
  restPasswordSchema,
} = require("../schema/user");

// 导入处理函数
const {
  registerHandler,
  loginHandler,
  userInfoHandler,
  modifyUserHandler,
  restPasswordHandler,
} = require("../handler/user");

/** 注册新用户*/
router.post("/register", expressJoi(registerSchema), registerHandler);

/** 登录 */
router.post("/login", expressJoi(loginSchema), loginHandler);

/** 用户信息 */
router.get("/userInfo", userInfoHandler);

/** 修改用户信息 */
router.post("/modifyUser", expressJoi(modifySchema), modifyUserHandler);

/** 修改密码 */
router.post(
  "/restPassword",
  expressJoi(restPasswordSchema),
  restPasswordHandler
);

// 导出模块
module.exports = router;
