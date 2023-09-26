import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
//Para documentar los dto se debe coger el PartialType del paquete de swagger
//ApiProperty: decorador que permite colocar más información de qué espero del atributo
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  //propiedades que no pueden ser modificadas con readonly en tiempo de desarrollo, por ejemplo cuando lo deseamos cambiar en services una de estas propiedades no lo permitirá
  // Pero al enviar el request al servicio no lo valida
  //validación que sea string en tiempo de ejecución: al enviar el request al servicio
  @IsString()
  //validando que no sea vacío
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of product' })
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
export class UpdateProductDto extends PartialType(CreateProductDto) {}
