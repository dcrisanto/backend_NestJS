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
  getBrand(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Get(':id/product/:productId')
  getBrandsProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.brandsService.findBrandProduct(id, productId);
  }

  /* @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  } */
}
