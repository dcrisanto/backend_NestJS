import {
  Get,
  Param,
  Query,
  Controller,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    //@Query('brand') brand: string,
  ) {
    /* return {
      message: `products: limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    }; */
    return this.productsService.findAll();
  }

  @Get('filter/:name')
  getProductFilter(@Param('name') name: string) {
    return this.productsService.search(name);
  }

  @Get(':id')
  //personalizando el code status
  @HttpCode(HttpStatus.ACCEPTED)
  //style express
  getProductId(/* @Res() response: Response,  */ @Param('id') id: number) {
    /* response.status(200).send({
      message: `productId ${id}`,
    }); */
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
