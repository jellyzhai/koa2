const Koa = require('koa')

const app = new Koa()

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