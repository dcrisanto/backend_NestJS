import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

//creando una instancia de la conexión
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: '123456',
  database: 'my_db',
});

client.connect();
//error first: envía el error de primera
client.query('SELECT * FROM tasks', (err, res) => {
  if (err) throw err;
  console.error(err);
  console.log(res.rows);
});

@Module({
  imports: [
    ConfigModule.forRoot({
      //que archivo va a leer: con process.env.NODE_ENV le enviamos el nombre del ambiente
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      //enviando lo que queremos cargar
      load: [config],
      isGlobal: true,
      //validación en tiempo de ejecución
      validationSchema: Joi.object({
        //colocamos el nombre que está en la variable de entorno
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
