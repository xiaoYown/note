
'use strict'

const path 			= require('path');
const Koa 			= require('koa');
const app 			= new Koa();
const render 		= require('koa-ejs');
const co 			= require('co');
const convert 		= require('koa-convert');
const json 			= require('koa-json');
const onerror 		= require('koa-onerror');
const bodyparser 	= require('koa-bodyparser')();
const logger 		= require('koa-logger');
const redisStore 	= require('koa-redis');
const session 		= require('koa-session');
const open 			= require("open");

const Router = require('koa-router');

const router = Router();

var wrapper = require('co-mysql'),
	mysql 	= require('mysql'); 

var options = {
	host : 'localhost',
	port : 3306 ,
	database : 'blog_test',
	user: 'root',
	password : '511687372'
};

var pool = mysql.createPool(options),
	db_operate = wrapper(pool);

app.use(convert(require('koa-static2')("/static", __dirname + '/static')));
app.use(convert(bodyparser));
app.use(convert(json()));
// app.use(convert(logger()));
app.use(logger());
onerror(app);

 render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'layout',
	viewExt: 'html',
	cache: false,
	debug: true
});

var myRouter = new Router();
/**
 * 创建数据库: create database dbname
 * 创建表: CREATE TABLE IF NOT EXISTS user_info ( user_id VARCHAR(30), user_pwd VARCHAR(30) )
 * 
 * 查询:   select * from table_name where __key__=__value__ (limit 1)
 * 
 * 插入列(首部): alter table table_name add  column col_name varchar(30) first
 * 插入列(末尾): alter table table_name add  column col_name varchar(30) (not null)
 * 插入列(之后): alter table table_name add  column col_name varchar(30) after __col__name
 * 删除列: alter table table_name drop column col_name
 * 
 * 插入行: inert into table_name (col1_name,col2_name) values (col1_val, col2_val)
 * 修改:   update table_name set _key_=_value_ where __key__=__value__ (limit 1) 
 */

/**
 * CREATE TABLE admin ( user_id CHAR, user_pwd CHAR, user_name CHAR );
 * INSERT INTO admin (user_id, user_pwd, user_name) VALUES ('admin', '511687372', 'xiaoYown');
 */

app.keys = ['some secret hurr'];

const CONFIG = {
	key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
	maxAge: 1000000,//86400000, /** (number) maxAge in ms (default is 1 days) */
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

// app.use(ctx => {
// 	console.log(ctx)
// 	let n = ctx.session.views || 0;
// 	ctx.session.views = ++n;
// 	ctx.body = n + ' views';
// });

let isLogin = function *( next ){
	if( !this.session.user_id )
		return this.redirect( '/login' );
	else
		yield next;
}

router
	.get('/', function *( next ) {
		yield this.render('index', {layout: false, title: '首页'});
	})
	.get('/admin', isLogin , function *( next ) {
		yield this.render('admin', {layout: false});
	})
	.get('/login', function *( next ) {
		yield this.render('login', {layout: false, title: '登录'});
	})
	.post('/login', function *( cxt, next ){
		let body = this.request.body;
		if( !!body.user_id && body.user_pwd ){
			try{
				let exists = yield db_operate.query(`SELECT * FROM admin WHERE user_id="${body.user_id}" LIMIT 1`)
				if( exists[0].user_pwd == body.user_pwd ){
					
					this.session.user_id = body.user_id;

					this.body = {
						code: '000000',
						success: true,
						message: '登录成功',
					};
				} else {
					this.body = {
						code: '000001',
						success: true,
						message: '密码或账户错误',
					};
				}
			} catch(err) {
				this.body =  {
					code: '000002',
					success: true,
					message: '密码或账户错误',
				};
			}
		} else {
			this.body = {
				code: '000001',
				success: true,
				message: '密码或账户错误',
			};
		}
	})
	.post('/artical/:method', function *( cxt, next ){
		let body = this.request.body;

		let type = {
			blog: {
				name: '博客',
				child: {
					web_front_end: {
						name: 'web前端',
						child: {
							framework: {
								name: '框架',
							}
						}
					}
				}
			}
		};
		let new_time = new Date().valueOf();
		let id = `${body.type_NO01}-${body.type_NO02}-${body.type_NO03}-${new_time}`,
			create_time = new_time.toLocaleString(),
			type_NO01 = body.type_NO01,
			type_NO02 = body.type_NO02,
			type_NO03 = body.type_NO03;

		try {
			let exists = yield db_operate.query(`SELECT * FROM artical where id = ${id}`)
		} catch( err ) {
			console.log(type[type_NO01].name)
			switch (this.params.method){
				case 'add':
					console.log(`INSERT INTO artical (
							type_NO01,
							type_NO02,
							type_NO03,
							type_name_NO01,
							type_name_NO02,
							type_name_NO03,
							content
						) 
						values 
						(
							"${type_NO01}",
							"${type_NO02}",
							"${type_NO03}",
							"${type[type_NO01].name}",
							"${type[type_NO01].child[type_NO02].name}",
							"${type[type_NO01].child[type_NO02].child[type_NO03].name}",
							"${body.content}"
						)`)
					yield db_operate.query(`insert into artical (
							type_NO01,
							type_NO02,
							type_NO03,
							type_name_NO01,
							type_name_NO02,
							type_name_NO03,
							content
						) 
						values 
						(
							"${type_NO01}",
							"${type_NO02}",
							"${type_NO03}",
							"${type[type_NO01].name}",
							"${type[type_NO01].child[type_NO02].name}",
							"${type[type_NO01].child[type_NO02].child[type_NO03].name}",
							"${body.content}"
						)`)
					break;
			}
			this.body = {
				code: '000000',
				success: true,
				message: '请求成功'
			}

		}

	})
	.post('/register', function *( cxt, next ) {
		let body = this.request.body;
		// if( !!body.user_id && body.user_pwd ){
		// 	console.log(`SELECT * FROM user_info WHERE EXISTS user_id="${body.user_id}"`)
		// 	// let exists = yield db_operate.query(`SELECT * FROM user_info WHERE EXISTS user_id="${body.user_id}"`)
		// 	// console.log(exists)
		// 	// yield db_operate.query(`INSERT INTO user_info (user_id, user_pwd) VALUES ("${body.user_id}","${body.user_pwd}")`);

		// 	this.body = {
		// 		code: '000000',
		// 		success: true,
		// 		message: '注册成功',
		// 	};
		// }
	}, router.allowedMethods());


app.use(router.routes());

// router.use('/', index.routes(), index.allowedMethods());

// response
app.on('error', function(err, ctx){
	console.error(err);
	// console.error('server error', err, ctx);
});

app.listen(3002);

// open("http://localhost:3002")

module.exports = app;