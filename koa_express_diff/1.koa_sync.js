const Koa = require("koa");

const app = new Koa();

/*
    express 基于回调函数实现，底层没有用 promise 实行
    中间件 类似流水线 顺序执行，上一个失败，下一个 就不会执行
 */
app.use((ctx, next) => {
  console.log(111);

  next();

  console.log(333);

  ctx.body = "hello world.";
});

app.use((ctx, res) => {
  console.log(222);
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000 启动成功");
});
