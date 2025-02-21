
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use((ctx, next) => { // ctx - типа context
  console.log(ctx.request.body);

  ctx.response.body = 'SERVER response';

  next();
});

app.use(koaBody({ // ошибку выдаёт, говорит что koaBody не функция, версию надо ниже
  urlencoded: true,
}));

app.use((ctx) => {
  console.log(ctx.request.body);
  console.log('I am a second middleware');
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('Server is listening to ' + port);
});
