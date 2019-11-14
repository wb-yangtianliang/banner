const router = require('koa-router')();

const userRouter = require('./user');
const proRouter = require('./prodece');

router.use(userRouter.routes(), userRouter.allowedMethods());
router.use(proRouter.routes(), proRouter.allowedMethods());

module.exports = router;