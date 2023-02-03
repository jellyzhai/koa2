const Koa = require("koa");

const app = new Koa();

/*
    express 基于回调函数实现，底层没有用 promise 实行
    中间件 类似流水线 顺序执行，上一个失败，下一个 就不会执行
 */
app.use(async (ctx, next) => {
  console.log(111);

  const token = await next();

  console.log(444, token);

  ctx.body = "hello world.";
});

app.use(async (ctx, res) => {
  console.log(222);
  return await delayGetToken(2000);
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000 启动成功");
});

function delayGetToken(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(333);
      resolve("123qwesdf234fsdf");
    }, time);
  });
}