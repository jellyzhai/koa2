const Koa = require('koa')
const Router = require('koa-router')
const routerAll = require("./routers");

const app = new Koa()
const router = new Router();

router
  .use(routerAll.routes())

/*
  router.allowedMethods() 中间件 在客户端 以错误请求方法 发起请求时，给出正确请求方法的响应
  会在响应头中 添加 Allow: POST (DELETE, GET, PUT...)
*/
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000 启动成功");
});