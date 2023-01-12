import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

@Module({
  //Indicando que TypeORM va a administrar, indicando que entity será administrada
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  //Para poder usado por otro módulo
  exports: [ProductsService],
})
export class ProductsModule {}
