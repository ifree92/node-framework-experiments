const express = require('express');
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

const app = express();

app.get('/', (req, res) => {
  res.send(template);
});

app.get('/json', (req, res) => {
  res.json({
    data: dataObject,
  });
});

app.get('/echo', (req, res) => {
  res.send('ok');
});

app.listen(PORT, () => console.log(`Express listening on :${PORT}`));
