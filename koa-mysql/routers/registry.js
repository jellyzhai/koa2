const Router = require("koa-router");
const multer = require("@koa/multer");
const JWT = require("../utils/jwt");
const promisePool = require("../db/pool");

const router = new Router();

// 设置上传文件的存储位置
const upload = multer({ dest: "public/uploads/" });

// upload.single('avatar') 设置接收的单文件属性为 avatar，与表单中表单项name属性一致
// ctx 对象会增加 file 属性对象，存储文件信息
// 除了文件以外的数据，会在 ctx.request的body属性中，不加 single 中间件会导致 body为空对象
router.post("/", upload.single("avatar"), async (ctx, next) => {
  /*
  使用 koa-bodyparser 实现
  获取来自请求头 content-type 是 conte application/json 和
  application/x-www-form-urlencode 的请求体数据，
  返回：{} 对象格式
  */
 // console.log("data: ", ctx.request.body);
 // console.log("ctx.request.file: ", ctx.request.file);

  let { filename } = ctx.request.file || {};
  const avatar = filename ? `/uploads/${filename}` : "/images/default.jpg";
  const { username, password, age, classes } = ctx.request.body;
  const foreignKeyVal = Date.now().toString();

  try {
    const res1 = await promisePool.query("insert into scores (id) values (?)", [
      foreignKeyVal,
    ]);

    const res2 = await promisePool.query(
      "insert into students (username, password, age, classes, avatar, scores_id) values (?,?,?,?,?,?)",
      [username, password, age, classes, avatar, foreignKeyVal]
    );
    const id = res2[0].insertId;

    const token = JWT.generate({ username, password }, "1d");

    ctx.set("authorization", token);
    ctx.body = { code: 1, data: { username, id } };
  } catch (err) {
    await promisePool.query("delete from scores where id=?", [foreignKeyVal]);
    ctx.body = { code: 0, data: err };
  }
});

module.exports = router;
