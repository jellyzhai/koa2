const Router = require("koa-router");

const router = new Router();

router
  .get("/", async (ctx, next) => {
    // 获取指定 cookie
    // const name = ctx.cookies.get('name')
    // console.log(name);

    // 向前端设置 httpOnly 的 cookie
    ctx.cookies.set('name', 'jelly')
    // render 异步渲染，返回 promise ，需要渲染模板完成后，再向前端返回
    await ctx.render('home', {username: 'jelly'});
  });

module.exports = router;
