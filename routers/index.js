const Router = require('koa-router')
const loginPageRouter = require("./loginPage");
const loginRouter = require("./login");
const listRouter = require("./list");
const userRouter = require("./user");
const uploadRouter = require("./upload");

const router = new Router();

router
  // 给所有后续路由统一加前缀
  // .prefix('/api')
  .redirect("/", "/login")
  .use("/login", loginPageRouter.routes())
  .use("/api/login", loginRouter.routes())
  .use("/api/user", userRouter.routes())
  .use("/api/upload", uploadRouter.routes())
  .use("/list", listRouter.routes());

module.exports = router