import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CustomersService } from '../users/services/customers.service';
import { UsersService } from '../users/services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  //importamos ProductsModule para poder usar ProductsService en UsersServices
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
