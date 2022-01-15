/** 新用户注册*/
const registerHandler = (req, res) => {
  res.send({
    code: "register",
    data: { data: "" },
    msg: "注册新用户",
  });
};

/** 登录*/
const loginHandler = (req, res) => {
  res.send({
    code: "login",
    data: { data: "" },
    msg: " ",
  });
};

module.exports = { registerHandler, loginHandler };
