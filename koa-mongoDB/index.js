const path = require("path");
const Koa = require('koa')
const static = require('koa-static')
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')

// 启动 websocket 服务器
require('./ws_server')

// 连接 mongo 数据库
require('./config/db_config')

// 实现后端渲染
const views = require("koa-views");

const routerAll = require("./routers");
const JWT = require("./utils/jwt");

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

// 通过 token 信息，统一判断登录状态
// 调用 next 时，需要等待 next 返回的promise 执行完成后，再继续执行当前函数
app.use(async (ctx, next) => {
  if (
    ['/', "/registry", "/login", "/api/login", "/api/registry"].includes(ctx.url)
  ) {
    await next();
    return;
  }

  const token = ctx.headers.authorization

  if (token) {
    // 判断 token 是否过期，或是否能正确解析出数据
    const decryptData = JWT.verify(token)
    if (decryptData) {
      const newToken = JWT.generate(
        {
          username: decryptData.username,
          password: decryptData.password,
        },
        "1d"
      );

      ctx.set("authorization", newToken);
      await next();
    } else {
      ctx.body = {code: 401};
    }
  } else {
    ctx.body = { code: 401 };
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