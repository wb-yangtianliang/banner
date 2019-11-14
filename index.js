const Koa = require('koa');
const app = new Koa();

const path = require('path');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const router = require('./router/index');
const query = require('./middleware/query');

app.use(static(path.join(process.cwd(), 'public')));
app.use(query());
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods())


app.listen(9696, () => {
    console.log('服务已启动9696');
})