import { Controller, Get } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

const template = readFileSync(join(__dirname, '..', 'template', 'index.html')).toString();
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

@Controller()
export class AppController {
  @Get('/')
  getIndex(): string {
    return template;
  }

  @Get('/json')
  getJson() {
    return dataObject;
  }

  @Get('/echo')
  getEcho() {
    return 'ok';
  }
}
