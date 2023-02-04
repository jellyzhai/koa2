const Router = require('koa-router')
const loginRouter = require("./login");
const listRouter = require("./list");
const userRouter = require("./user");
const homeRouter = require("./home");

const router = new Router();

router
  // 给所有后续路由统一加前缀
  // .prefix('/api')
  .use('/login', loginRouter.routes())
  .use("/user", userRouter.routes())
  .use("/list", listRouter.routes())
  .use("/home", homeRouter.routes())
  .redirect('/', "/home");

module.exports = router