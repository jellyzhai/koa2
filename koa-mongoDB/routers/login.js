const Router = require("koa-router");
const JWT = require("../utils/jwt");
const UserModel = require('../model/model');

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

    const userInfo = await UserModel.findOne({ username, password });

    if (userInfo) {
      const { _id: id } = userInfo;
      const token = JWT.generate({ username, password }, "1d");

      ctx.set("authorization", token);
      ctx.body = { code: 1, data: { username, id } };
    } else {
      ctx.body = { code: 401, data: null };
    }
  } catch (error) {
    ctx.body = { code: 0, data: error };
  }
});

module.exports = router;
