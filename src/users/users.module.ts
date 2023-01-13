import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CustomersService } from 'src/users/services/customers.service';
import { UsersService } from 'src/users/services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';

@Module({
  //importamos ProductsModule para poder usar ProductsService en UsersServices
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
