const Router = require("koa-router");

const router = new Router();

router
  .post("/", (ctx, next) => {
    ctx.body = ctx.request;
  })
  .get("/", (ctx, next) => {
    ctx.body = [
      { id: 1, name: "aa", age: 18 },
      { id: 2, name: "bb", age: 18 },
      { id: 3, name: "cc", age: 18 },
    ];
  })
  .put("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 用户更新成功`;
  })
  .del("/:id", (ctx, next) => {
    ctx.body = `${JSON.stringify(ctx.params)} 用户删除成功`;
  });

module.exports = router;
