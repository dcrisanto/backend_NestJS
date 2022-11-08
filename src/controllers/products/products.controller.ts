import { Get, Param, Query, Controller } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `usando filter`;
  }

  @Get(':id')
  getProductId(@Param('id') id: number) {
    return `productId: ${id}`;
  }
}
