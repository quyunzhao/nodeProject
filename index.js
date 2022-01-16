const express = require("express");

const cors = require("cors");

/** 导入自定义send 函数 */
const mySend = require("./src/customMiddleware/send");

// 导入全局处理错误 函数
const errorHandler = require("./src/customMiddleware/catchError");

// 导入 api 前缀
const { prefixApi, port } = require("./config/cfg.json");

// 导入 api 路由
const userRouter = require("./src/router/user");

// 创建服务器
const app = express();

// 通过 express.json() 中间键解析表达中的 json 数据
app.use(express.json());

// 通过 express.urlencoded() 中间键解析表达中的 url-encoded 数据
app.use(express.urlencoded({ extended: false }));

// 一定要在路由之前导入跨域 cors 中间键，从而解决接口跨域问题
// 注册全局 跨域 中间键
app.use(cors());

// 一定要在路由之前封装res.send函数
// 注册全局  mySend 函数
app.use(mySend);

// 添加前缀 注册路由
app.use(prefixApi, userRouter);

// 注册全局错误中间键
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server star at http://127.0.0.1:${port}`);
});
