const Router = require("koa-router");

const router = new Router();

router.post('/', (ctx, next) => {
  // { username: 'admin', password: '123' } 使用 koa-bodyparser 实现
  console.log('data: ', ctx.request.body);

  const {username, password} = ctx.request.body;

  if (username === 'jelly' && password === '123' ) {
    // 登录成功后，向前端设置 httpOnly 的 cookie
    ctx.session.user = { username };

    ctx.body = {ok: 1}
  } else {
    ctx.body = {ok: 0}
  }
})

module.exports = router