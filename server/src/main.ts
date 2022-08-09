import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  // enable cors from http:localhost:3000 with credentials included
  app.use(
    cors({
      origin: process.env.CLIENT_URL_DEV,
      credentials: true,
      preflightContinue: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  );

  await app.listen(4000);
}
bootstrap();
