const express = require("express");
const router = express.Router();

// 注册新用户
router.post("/register", (req, res) => {
  res.send({
    code: 1,
    data: { data: "" },
    msg: "注册新用户",
  });
});

// 登录
router.post("/login", (req, res) => {
  res.send({
    code: 1,
    data: { data: "" },
    msg: " ",
  });
});

module.exports = router;
