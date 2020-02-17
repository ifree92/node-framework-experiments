import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT;

async function bootstrap() {
  const log = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  log.log(`Listening :${PORT}`);
}
bootstrap();
