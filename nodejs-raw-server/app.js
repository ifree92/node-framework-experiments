const http = require('http');
const url = require('url');
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

const keepAliveAgent = new http.Agent({ keepAlive: true });

const server = http.createServer({ agent: keepAliveAgent }, requestHandler);

function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url);
  switch (parsedUrl.pathname) {
    case '/':
      return onIndex(req, res);
    case '/json':
      return onJson(req, res);
    case '/echo':
      return onEcho(req, res);
    default:
      return on404(req, res);
  }
}

function onIndex(req, res) {
  res.writeHead(200);
  res.write(template);
  res.end();
}

function onJson(req, res) {
  res.writeHead(200);
  res.write(JSON.stringify(dataObject));
  res.end();
}

function onEcho(req, res) {
  res.writeHead(200);
  res.write('ok');
  res.end();
}

function on404(req, res) {
  res.writeHead(200);
  res.write('404: Page not found');
  res.end();
}

server.listen(PORT, () => console.log(`Raw listening on :${PORT}`));
