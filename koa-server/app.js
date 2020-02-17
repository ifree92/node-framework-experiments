const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'template', 'index.html')).toString();
const dataObject = {
  firstName: 'John',
  lastName: 'Smith',
  age: 45,
  hobbies: ['swimming', 'guitar', 'friends', 'walking', 'programming'],
  father: {
    firstName: 'Oleh',
    lastName: 'Smith',
    age: 88,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hobbies: ['swimming', 'guitar', 'friends', 'walking', 'programming'],
  },
  mother: {
    firstName: 'Eleonora',
    lastName: 'Smith',
    age: 88,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hobbies: ['swimming', 'guitar', 'friends', 'walking', 'programming'],
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const PORT = process.env.PORT;

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = template;
});

router.get('/json', (ctx, next) => {
  ctx.body = dataObject;
});

router.get('/echo', (ctx, next) => {
  ctx.body = 'ok';
});

app.use(router.routes()).listen(PORT, () => console.log(`Koa listening on :${PORT}`));
