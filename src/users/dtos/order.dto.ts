import { PartialType } from '@nestjs/swagger';
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

//OmitType: para realizar omisiones. Desde CreateOrderDto omita y un array le enviamos los atributos que queremos omitir
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
