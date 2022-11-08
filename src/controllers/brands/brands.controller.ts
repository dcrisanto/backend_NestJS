import { Controller, Get, Param } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('product/:id')
  getBrandsProduct(@Param('id') id: number) {
    return `retornando las marcas del producto con id ${id}`;
  }
}
