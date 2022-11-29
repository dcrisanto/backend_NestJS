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
  //ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

//colocar en grupo las api: ApiTags
@ApiTags('products')
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

  @Get(':id')
  //personalizando el code status
  @HttpCode(HttpStatus.ACCEPTED)
  //style express
  getProductId(/* @Res() response: Response,  */ @Param('id') id: string) {
    /* response.status(200).send({
      message: `productId ${id}`,
    }); */
    return this.productsService.findOne(id);
  }

  /*   @Get('filter/:name')
  getProductFilter(@Param('name') name: string) {
    return this.productsService.search(name);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  } */
}
