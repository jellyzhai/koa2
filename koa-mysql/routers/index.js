const Router = require('koa-router')
const loginPageRouter = require("./loginPage");
const loginRouter = require("./login");
const registryRouter = require("./registry");
const userRouter = require("./user");

const router = new Router();

router
  // 给所有后续路由统一加前缀
  // .prefix('/api')
  .redirect("/", "/login")
  .use("/login", loginPageRouter.routes())
  .use("/api/login", loginRouter.routes())
  .use("/api/registry", registryRouter.routes())
  .use("/api/user", userRouter.routes())

module.exports = router