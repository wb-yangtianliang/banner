const router = require('koa-router')();
//查看
router.get('/api/list', async ctx => {
        //分页          pagenum  页码  limit  每页的条数
        try {
            let total = await ctx.mysql.query('select count(*) from bannerlist');
            let { pagenum = 1, limit = 3 } = ctx.query;
            let startIndex = (pagenum - 1) * limit;
            let data = await ctx.mysql.query(`select * from bannerlist limit ${startIndex},${limit}`);
            ctx.body = {
                code: 1,
                total: total[0]['count(*)'],
                data
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }

    })
    //添加
router.post('/api/add', async ctx => {
        let { cont, type, sort } = ctx.request.body;
        let create_time = new Date();
        if (cont && type && sort && create_time) {
            let user = await ctx.mysql.query('select * from bannerlist where 排序=?', [sort]);
            if (user.length) {
                ctx.body = {
                    code: 0,
                    msg: '用户已存在'
                }
            } else {
                try {
                    let data = await ctx.mysql.query('insert into bannerlist (备注,类型,排序,创建时间) value(?,?,?,?)', [cont, type, sort, create_time]);
                    ctx.body = {
                        code: 1,
                        msg: '添加成功'
                    }
                } catch (e) {
                    ctx.body = {
                        code: 0,
                        msg: e
                    }
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: '内容不能为空'
            }
        }
    })
    //删除
router.get('/api/dele', async ctx => {
        let { id } = ctx.query;
        console.log(id);

        if (id || id === 0) {
            try {
                await ctx.mysql.query('delete from bannerlist where 序号=?', [id]);
                ctx.body = {
                    code: 1,
                    msg: '删除成功'
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg: '参数缺失'
            }
        }
    })
    //修改
router.post('/api/edit', async ctx => {
    let { cont, type, sort, id } = ctx.request.body;

    if (cont && type && sort && id) {
        try {
            let create_time = new Date();
            await ctx.mysql.query('update bannerlist set 备注=?,类型=?,排序=?,创建时间=? where 序号=?', [cont, type, sort, create_time, id]);
            ctx.body = {
                code: 1,
                msg: '修改成功'
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: '参数缺失'
        }
    }
})
module.exports = router;