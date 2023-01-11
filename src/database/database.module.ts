import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD1234';

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
/* client.query('SELECT * FROM tasks', (err, res) => {
  if (err) throw err;
  console.error(err);
  console.log(res.rows);
}); */

//indicar al módulo que es de manera global
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  //para utilizar el provider fuera
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
