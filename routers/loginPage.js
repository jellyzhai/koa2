const Router = require('koa-router')

const router = new Router();

router.get('/', async (ctx, next) => {

    // { username: 'admin', password: '123' }
    // console.log(ctx.query);

    // username=admin&password=123
    // console.log(ctx.querystring);

    await ctx.render("login");
})

module.exports = router