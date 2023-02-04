const path = require("path");
const Koa = require('koa')
const static = require('koa-static')
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser')

const routerAll = require("./routers");

const router = new Router();
const app = new Koa()

// 设置静态目录
app.use(static(path.join(__dirname, 'public')))

// 使 ctx.request.body 中可获取 请求体
app.use(bodyParser());

// 配置路由
router.use(routerAll.routes());

/*
  router.allowedMethods() 中间件 在客户端 以错误请求方法 发起请求时，给出正确请求方法的响应
  会在响应头中 添加 Allow: POST (DELETE, GET, PUT...)
*/
app.use(router.routes()).use(router.allowedMethods());

/*
    ctx: context 上下文，里面聚合了request 和 response 对象
    ctx.req, ctx.res 是 node 的原生api 不建议使用
*/
/* app.use((ctx, next) => {
    // ctx.response.body = "<b>hello world</b>";
    // ctx.response.body = {name: 'jelly'};

    ctx.body = 'hello world.'
}) */

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000 启动成功");
});