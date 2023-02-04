const path = require("path");
const Koa = require('koa')
const static = require('koa-static')
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')

// 实现后端渲染
const views = require("koa-views");

const routerAll = require("./routers");

const router = new Router();
const app = new Koa()

// 设置静态目录
app.use(static(path.join(__dirname, 'public')))

// 使 ctx.request.body 中可获取 请求体
app.use(bodyParser());

// 配置模板引擎
app.use(views(path.join(__dirname, "views"), {extension: 'ejs'}));

// 配置 session；
// key 是保存到客户端的 cookie 名，值由后端自动生成
// 一个 key 对应一个后端的 session 对象
// 缺点：服务器已重启，存到服务器内存中的session 对象就会丢失，导致前端登录失效
app.use(session({
  key: 'jellySessionId',
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

// 通过session 信息，统一判断登录状态
// 调用 next 时，需要等待 next 返回的promise 执行完成后，再继续执行当前函数
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    await next();
    return
  }
  if (ctx.session.user) {
    // 给当前用户的 session 对象 添加任何数据，都会重新计算 cookie 的过期时间，再保证一个初始的过期时间
    ctx.session.date = Date.now()
    await next();
  } else {
    ctx.redirect('/login')
  }
})

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