const express = require("express");
const router = express.Router();

const { registerHandler, loginHandler } = require("../handler/user");

/** 注册新用户*/
router.post("/register", registerHandler);

/** 登录 */
router.post("/login", loginHandler);

module.exports = router;
