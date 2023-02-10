const Router = require("koa-router");
const multer = require("@koa/multer");
const UserController = require("../controllers/userController");

const router = new Router();
const upload = multer({dest: 'public/uploads/'});

router.get("/", UserController.get);

router.put("/:id", upload.single('avatar'),UserController.update);

router.delete("/:id", UserController.delete);

module.exports = router;
