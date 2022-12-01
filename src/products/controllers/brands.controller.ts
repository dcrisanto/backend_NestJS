import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from '../services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @Get(':id/product/:productId')
  getBrandProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId') productId: string,
  ) {
    return this.brandsService.findBrandProduct(id, productId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.delete(id);
  }
}
