import { NestFactory } from '@nestjs/core';
//Para activar las validaciones
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //para ser usado de manera global
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
