const fastify = require('fastify');
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

const app = fastify();

app.get('/', async (req, res) => {
  res.type('text/html');
  return template;
});

app.get('/json', async (req, res) => {
  return { data: dataObject };
});

app.get('/echo', async (req, res) => {
  res.type('text/html');
  return 'ok';
});

app.listen(PORT, '0.0.0.0', () => console.log(`Fastify listening on :${PORT}`));
