const router = require('koa-router')();
const db_operate = require('../mysql').db_operate;

router.get('/:type', function *(){
		try{
			let artical_list = yield db_operate.query(`SELECT * FROM artical WHERE type_NO01="${this.params.type}"`)
			this.body = {
				code: '000000',
				success: true,
				message: '查询成功',
				data: artical_list,
			}
		} catch(err) {
			this.body = {
				code: '000000',
				success: true,
				message: '无此类文章',
				data: [],
			}
		}
	});

module.exports = router;