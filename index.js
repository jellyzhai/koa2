const path = require("path");
const Koa = require('koa')
const static = require('koa-static')

const app = new Koa()

app.use(static(path.join(__dirname, 'public')))

/*
    ctx: context 上下文，里面聚合了request 和 response 对象
    ctx.req, ctx.res 是 node 的原生api 不建议使用
*/
app.use((ctx, next) => {
    // ctx.response.body = "<b>hello world</b>";
    // ctx.response.body = {name: 'jelly'};

    ctx.body = 'hello world.'
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000 启动成功');
})