import { NestFactory } from '@nestjs/core';
//OPENAPI: documentación de api
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //habilitar los cross para que se puedan realizar peticiones fuera del dominio
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
