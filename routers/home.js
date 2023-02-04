const Router = require("koa-router");

const router = new Router();

router
  .get("/", async (ctx, next) => {
    // render 异步渲染，返回 promise ，需要渲染模板完成后，再向前端返回
    await ctx.render('home', {username: 'jelly'});
  });

module.exports = router;
