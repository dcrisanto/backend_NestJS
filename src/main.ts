import { NestFactory } from '@nestjs/core';
//Para activar las validaciones
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //para ser usado de manera global
  app.useGlobalPipes(
    new ValidationPipe({
      //retira del paylod todos los atributos que no estén definidos en el dto
      whitelist: true,
      //para alertarlo que se está enviando una propiedad que no está definida
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
