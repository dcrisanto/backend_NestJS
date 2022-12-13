import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from 'src/products/products.module';
import { CustomersService } from 'src/users/services/customers.service';
import { UsersService } from 'src/users/services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from './entities/user.entity';
import { OrdersService } from './services/orders.service';

@Module({
  //importamos ProductsModule para poder usar ProductsService en UsersServices
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
