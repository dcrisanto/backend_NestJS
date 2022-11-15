import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { UsersController } from './controllers/users/users.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { ProductsService } from './services/products/products.service';
import { UsersService } from './services/users/users.service';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { CustomersService } from './services/customers/customers.service';
import { OrdersService } from './services/orders/orders.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, UsersController, BrandsController, OrdersController, CustomersController],
  providers: [AppService, ProductsService, UsersService, BrandsService, CategoriesService, CustomersService, OrdersService],
})
export class AppModule {}
