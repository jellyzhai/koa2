const Router = require("koa-router");
const multer = require("@koa/multer");
const UserController = require("../controllers/userController");

const router = new Router();

// 设置上传文件存储的位置
const upload = multer({ dest: "public/uploads/" });

router.get("/", UserController.get);

// upload.single('avatar') 设置接收的单文件属性为 avatar，与表单中表单项name属性一致
// ctx 对象会增加 file 属性对象，存储文件信息
// 除了文件以外的数据，会在 ctx.request的body属性中，不加 single 中间件会导致 body为空对象
router.put("/:id", upload.single("avatar"), UserController.update);

router.delete("/:id", UserController.delete);

module.exports = router;
