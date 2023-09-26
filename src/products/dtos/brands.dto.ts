import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: Product[];
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
