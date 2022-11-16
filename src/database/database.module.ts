import { Module, Global } from '@nestjs/common';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD1234';

//indicar al módulo que es de manera global
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  //para utilizar el provider fuera
  exports: ['API_KEY'],
})
export class DatabaseModule {}
