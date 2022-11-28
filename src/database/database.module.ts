import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from '../config';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD1234';

//indicar al módulo que es de manera global
@Global()
@Module({
  imports: [
    //conexión de mongo con el paquete de nest
    /* MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: 'root',
      dbName: 'platzi-store',
    }), */
    //Manera asíncrona y tomando las variables de ambiente
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        //retornamos en un nuevo objecto cuáles serán las opciones de conección
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      //conexión nativa de Mongo por el driver
      provide: 'MONGO',
      //Resolvemos la inyección
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        //obtenemos la url de conección del software mongoCompass
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;

        //creamos una instancia de MongoClient, dándole cómo parámetro de entrada la url de conexión
        const client = new MongoClient(uri);
        //conexión a la DB de manera asíncrona
        await client.connect();
        const database = client.db(`${dbName}`);
        return database;
      },
      //dependencias que queremos inyectar en useFactory
      inject: [config.KEY],
    },
  ],
  //para utilizar el provider fuera
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
