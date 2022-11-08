import { Get, Param, Query, Controller, Post, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: 'usando filter',
    };
  }

  @Get(':id')
  getProductId(@Param('id') id: number) {
    return {
      message: `productId: ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }
}
