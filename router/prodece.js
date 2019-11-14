const router = require('koa-router')();

//模糊搜索
router.get('/api/search', async ctx => {
    let { key } = ctx.query;
    let sql = '';
    if (key) {
        sql = `select * from bannerlist where 布 like '%${key}%'`
    } else {
        sql = 'select * from bannerlist'
    }
    try {
        let list = await ctx.mysql.query(sql);
        ctx.body = {
            code: 1,
            data: list
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})
module.exports = router