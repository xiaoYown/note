```js
const Koa = require('koa');
const Router = require('@koa/router');
const koajwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const formidable = require('formidable')

const app = new Koa();

const TOKEN_NAME = 'EG_TOKEN';

const router = new Router();

// // response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        data: null,
        msg: 'No permission.'
      };
    } else {
      throw err;
    }
  });
});

// // Unprotected middleware
// app.use(function (ctx, next) {
//   if (ctx.url.match(/^\/public/)) {
//     ctx.body = 'unprotected\n';
//   } else {
//     return next();
//   }
// });
router.post('/api/public/login', async (ctx) => {
  const data = ctx.request.body;
  // const result = await userModel.findOne({
  //   name: data.name,
  //   password: data.password
  // })
  const result = {
    _id: '123456'
  }
  if (result !== null) {
    const token = jwt.sign({
      _id: result._id
    }, 'secret', { expiresIn: '2h' });
    return ctx.body = {
      code: 200,
      token: token,
      msg: '登录成功'
    }
  } else {
    return ctx.body = {
      code: 400,
      token: null,
      msg: '用户名或密码错误'
    }
  }
});
app.use(async (ctx, next) => {
  if (ctx.url === '/api/public/upload' && ctx.method.toLowerCase() === 'post') {
    let i = 0;
    const form = formidable({
      multiples: true,
      keepExtensions: true,
      // must return absolute path
      filename: 'file'
    });

    // not very elegant, but that's for now if you don't want touse `koa-better-body`
    // or other middlewares.
    console.log(Object.keys(ctx.req))
    form.parse(ctx.req, (err, fields, files) => {
      console.log(fields)
      console.log(files)
      if (err) {
        ctx.status = 4002;
      } else {
        ctx.status = 200;
      }

      ctx.set('Content-Type', 'application/json');
      ctx.state = { fields, files };
      ctx.body = JSON.stringify(ctx.state, null, 2);
    });
    return;
  } else {
    next();
  }
});

router.post('/api/test', async (ctx) => {
  return ctx.body = {
    code: 200,
    msg: '测试成功'
  }
});

// Middleware below this line is only reached if JWT token is valid
app.use(koajwt({ secret: 'secret' }).unless({ path: [/^\/api\/public/] }));

// 这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
// app.use(async (ctx, next) => {
//   var token = ctx.headers.authorization;
//   if (token == undefined) {
//     await next();
//   } else {
//     verToken.verToken(token).then((data) => {
//       ctx.state = {
//         data: data
//       };
//     })
//     await next();
//   }
// })

// Protected middleware
// app.use(function (ctx) {
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n';
//   }
// });

app.use(router.routes());

app.listen(3002);
```