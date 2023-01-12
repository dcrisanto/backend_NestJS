import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import { Product } from 'src/products/entities/product.entity';
import config from '../config';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD1234';

//error first: envía el error de primera
/* client.query('SELECT * FROM tasks', (err, res) => {
  if (err) throw err;
  console.error(err);
  console.log(res.rows);
}); */

//indicar al módulo que es de manera global
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, password, dbName, host, port } = ConfigService.postgres;
        return {
          type: 'postgres', //indicar de forma explícita la DB
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true, //buscar cualquier entidad que se ha definido y la sincroniza
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      //useValue: client,
      //Injección de dependencias, variables de entorno
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, password, dbName, host, port } = ConfigService.postgres;
        //creando una instancia de la conexión
        const client = new Client({
          host,
          port,
          user,
          password,
          database: dbName,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  //para utilizar el provider fuera
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
