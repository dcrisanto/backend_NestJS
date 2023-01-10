import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

//OmitType: para realizar omisiones. Desde CreateOrderDto omita y un array le enviamos los atributos que queremos omitir. Se va a omitir la propiedad products en el método update ya que por buenas prácticas manipular arrays se debe realizar a parte ya que tienen sus propios métodos
export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
