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
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

//colocar en grupo las api: ApiTags
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  //personalizando el code status
  @HttpCode(HttpStatus.ACCEPTED)
  //style express
  getProductId(
    /* @Res() response: Response,  */ @Param('id', MongoIdPipe) id: string,
  ) {
    /* response.status(200).send({
      message: `productId ${id}`,
    }); */
    return this.productsService.findOne(id);
  }

  @Get('filter/:search')
  getProductFilter(@Param('search') search: string) {
    return this.productsService.search(search);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }
  nestjs;
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id);
  }
}
