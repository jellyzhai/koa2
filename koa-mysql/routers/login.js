const Router = require("koa-router");
const JWT = require("../utils/jwt");
const promisePool = require("../db/pool");

const router = new Router();

router.post("/", async (ctx, next) => {
  /*
  使用 koa-bodyparser 实现
  获取来自请求头 content-type 是 conte application/json 和
  application/x-www-form-urlencode 的请求体数据，
  返回：{ username: 'admin', password: '123' }
   */
  // console.log('data: ', ctx.request.body);

  const { username, password } = ctx.request.body;

  try {
    const userInfo = await promisePool.query(
      "select username, id from students where username=? and password=?",
      [username, password]
    );

    if (userInfo[0].length) {
      const [{id}] = userInfo[0];
      const token = JWT.generate({ username, password }, "1d");

      ctx.set("authorization", token);
      ctx.body = { code: 1,  data: { username,id }};
    } else {
      ctx.body = { code: 0 };
    }
  } catch (error) {
    ctx.body = { code: 0, data: error };
  }
});

module.exports = router;
