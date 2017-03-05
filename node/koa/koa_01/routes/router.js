const router = require('koa-router')();

router.get('/', function *(ctx, next) {

    await ctx.render('index', {
        title: '首页',
    }); 
});

router.use('/', router.routes(), index.allowedMethods());

module.exports = router