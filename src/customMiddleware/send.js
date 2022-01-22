/**  自定义send 函数 */
const mySend = (req, res, next) => {
  /**
   * @author YunZhao Qu
   * @param data 返回的数据
   * @param statusCode 默认值为200 表示 http 成功
   * @param err err的值可能是一个错误对象，也可能是一个错误描述的字符串
   * @param status 默认值为1 表示失败
   */
  // console.log(req);
  res.customSend = (data, statusCode = 200, err = "", status = 1) => {
    res.status(statusCode).send(data);
  };

  next();
};

module.exports = mySend;
