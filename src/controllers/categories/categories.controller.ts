import { Body, Get, Post } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  // se llama los parámetros dentro del atributo del método
  getCategory(@Param('id') id: number, @Param('productId') productId: number) {
    return `product ${productId} and category ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create categories',
      payload,
    };
  }
}
