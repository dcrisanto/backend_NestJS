import { PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: Array<Product>;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
