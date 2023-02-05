const Router = require("koa-router");
const multer = require('@koa/multer');
const UserModel = require("../mongo_db_model/model");

const router = new Router();
// 设置上传文件存储的位置
const upload = multer({dest: 'public/uploads'})

router
  // upload.single('avatar') 设置接收的单文件属性为 avatar，与表单中表单项name属性一致
  // ctx 对象会增加 file 属性对象，存储文件信息
  // 除了文件以外的数据，会在 ctx.request的body属性中，不加 single 中间件会导致 body为空对象
  .post("/", upload.single("avatar"), async (ctx, next) => {
    const {username, password, age } = ctx.request.body;
    const { filename } = ctx.file;

    const avatar = filename ? `/uploads/${filename}` : ''

    try {
      await UserModel.create({ username, password, age, avatar });
      ctx.body = { ok: 1 };
    } catch (error) {
      ctx.body = { ok: 0 };
    }
  });

module.exports = router;
