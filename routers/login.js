const Router = require('koa-router')

const router = new Router();

router.get('/', (ctx, next) => {

    // { username: 'admin', password: '123' }
    console.log(ctx.query);

    // username=admin&password=123
    console.log(ctx.querystring);
    ctx.body = {ok: 1}
})

router.post('/', (ctx, next) => {
  // { username: 'admin', password: '123' } 使用 koa-bodyparser 实现
  console.log(ctx.request.body);
  ctx.body = { ok: 1 };
})

module.exports = router