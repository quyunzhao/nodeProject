const express = require("express");

// 导入跨域组件
const cors = require("cors");

// 导入 jwt 解密包
const expressJWT = require("express-jwt");

// 导入 application/json urlencoded 请求数据
const bodyParser = require("body-parser");

/* 导入 解析 multipart/form-data */
const multipart = require("connect-multiparty");

// 导入密钥
const { secretKey } = require("./config");

/** 导入自定义send 函数 */
const mySend = require("./src/customMiddleware/send");

// 导入全局处理错误 函数
const errorHandler = require("./src/customMiddleware/catchError");

// 导入 api 前缀
const { prefixApi, port } = require("./config");

// 导入 用户 路由
const userRouter = require("./src/router/user");

// 导入 文章 路由
const articleRouter = require("./src/router/article");

// 创建服务器
const app = express();

// 通过 express.json() 中间键解析表单中的 json 数据
app.use(bodyParser.json()); // 数据JSON类型

// 通过 express.urlencoded() 中间键解析表达中的 url-encoded 数据
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

// multipart/form-data
app.use(multipart());

// 一定要在路由之前导入跨域 cors 中间键，从而解决接口跨域问题
// 注册全局 跨域 中间键
app.use(cors());

// 一定要在路由之前封装res.send函数
// 注册全局  mySend 函数
app.use(mySend);

// 将 jwt 字符串解析为对象
// 接口白名单
const witeList = ["/", "/register", "/login"].map((item) => {
  return prefixApi + item;
});

app.use(
  expressJWT({
    secret: secretKey,
    algorithms: ["HS256"],
    credentialsRequired: true, // 游客校验 设置为 false 就不校验了
  }).unless({
    path: [...witeList], // 设置白名单
  })
);

app.post(prefixApi + "/test/formData", (req, res) => {
  const data = {
    body: req.body,
    query: req.query,
    files: req.files,
  };
  res.customSend(data);
});

// 添加前缀 注册路由
app.use(prefixApi, userRouter);

app.use(prefixApi + "/article", articleRouter);

// 注册全局错误中间键
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server star at http://127.0.0.1:${port}`);
});
