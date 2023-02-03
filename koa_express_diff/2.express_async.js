const express = require("express");

const app = express();

/*
    express 基于回调函数实现，底层没有用 promise 实行
    中间件 类似流水线 顺序执行，上一个失败，下一个 就不会执行
 */
app.use(async (req, res, next) => {
  console.log(111);

  await next();

  console.log(444, res.token);

  res.send("hello world.");
});

app.use(async (req, res) => {
  console.log(222);
  await delayGetToken(2000, res);
});

/*
  打印结果
  111
  222
  444
  333

  express 基于回调函数实现，底层没有用 promise 实行
  遇到异步就会挂起，继续向下执行，对于 需要 next 返回执行结果的操作，就不实现
*/

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000 启动成功");
});

function delayGetToken(time, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(333);
      res.token = "123qwesdf234fsdf";
    }, time);
  });
}
