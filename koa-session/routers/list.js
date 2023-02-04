const Router = require("koa-router");

const router = new Router();

router
  .post("/", (ctx, next) => {
    console.log(ctx.params);
    ctx.body = ctx.request;
  })
  .get("/", (ctx, next) => {
    ctx.body = [1, 2, 3];
  })
  .put("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 更新成功`;
  })
  .del("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 删除成功`;
  });

  module.exports = router