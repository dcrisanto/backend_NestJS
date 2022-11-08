import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('product/:id')
  getBrandsProduct(@Param('id') id: number) {
    return {
      message: `retornando las marcas del producto con id ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create brand',
      payload,
    };
  }
}
