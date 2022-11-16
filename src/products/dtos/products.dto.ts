import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  //propiedades que no pueden ser modificadas con readonly en tiempo de desarrollo, por ejemplo cuando lo deseamos cambiar en services una de estas propiedades no lo permitirá
  // Pero al enviar el request al servicio no lo valida
  //validación que sea string en tiempo de ejecución
  @IsString()
  //validando que no sea vacío
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

//Va a utilizar las mismas validaciones que CreateProductDto pero serán opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {
  // atriutos a actualizar opcionales
  /* readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string; */
}
