import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = parseInt(process.env.PORT);

async function bootstrap() {
  const log = new Logger('bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(PORT, '0.0.0.0');
  log.log(`Listening :${PORT}`);
}
bootstrap();
