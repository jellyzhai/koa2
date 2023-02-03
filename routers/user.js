const Router = require("koa-router");

const router = new Router();

router
  .post("/", (ctx, next) => {
    console.log(ctx.params);
    ctx.body = ctx.request;
  })
  .get("/", (ctx, next) => {
    ctx.body = ['aa', 'bb', 'cc'];
  })
  .put("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 用户更新成功`;
  })
  .del("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 用户删除成功`;
  });

module.exports = router;
