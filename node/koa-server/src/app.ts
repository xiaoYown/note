import Koa from "koa";

const cors = require("@koa/cors");

const logger = require("koa-logger");
const KoaBody = require("koa-body");

const Router = require("koa-router");

const router = new Router();

router
  .get(/.+/, async (ctx: any) => {
    console.log(ctx.request.query);
    ctx.body = {
      code: 0,
      data: {},
    };
  })
  .post(/.+/, async (ctx: any) => {
    console.log(ctx.request.body);
    ctx.body = {
      code: 0,
      data: {},
    };
  });

const app = new Koa();

function start(port: number): void {
  app.use(
    cors({
      "Access-Control-Allow-Origin": "*",
    })
  );
  app.use(logger());
  app.use(
    KoaBody({
      multipart: true,
      formidable: {
        maxFileSize: 1000 * 1024 * 1024,
      },
      patchKoa: true,
    })
  );
  app.use(router.routes()).use(router.allowedMethods());
  // app.use(router.routes());
  app.listen(port, () => {});
}

start(10118);
