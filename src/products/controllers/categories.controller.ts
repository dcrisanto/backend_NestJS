import { Body, Delete, Get, Post, Put } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { CategoriesService } from 'src/products/services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories() {
    return this.categoriesService.findAllCategory();
  }

  @Get(':id')
  getCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/products/:productId')
  // se llama los parámetros dentro del atributo del método
  getProductCategory(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.categoriesService.findProductCategory(id, productId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
