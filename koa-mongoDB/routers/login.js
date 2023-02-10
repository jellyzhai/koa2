const Router = require("koa-router");
const JWT = require("../utils/jwt");

const router = new Router();

router.post('/', (ctx, next) => {
  /*
  使用 koa-bodyparser 实现
  获取来自请求头 content-type 是 conte application/json 和
  application/x-www-form-urlencode 的请求体数据，
  返回：{ username: 'admin', password: '123' }
   */
  // console.log('data: ', ctx.request.body);

  const { username, password } = ctx.request.body;

  if (username === "jelly" && password === "123") {
    const token = JWT.generate({ username, password }, "1d");

    ctx.set("authorization", token);
    ctx.body = { ok: 1 };
  } else {
    ctx.body = { ok: 0 };
  }
})

module.exports = router