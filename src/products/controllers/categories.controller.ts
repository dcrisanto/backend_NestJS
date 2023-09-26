import { Body, Delete, Get, Post, Put } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories() {
    return this.categoriesService.findAllCategory();
  }

  @Get(':id/products/:productId')
  // se llama los parámetros dentro del atributo del método
  getProductCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.categoriesService.findProductCategory(id, productId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
