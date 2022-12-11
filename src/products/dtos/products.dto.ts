import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId, //validar en cascada
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
//Para documentar los dto se debe coger el PartialType del paquete de swagger
//ApiProperty: decorador que permite colocar más información de qué espero del atributo
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.dto';

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

  @IsNotEmpty()
  @ValidateNested() //Para que estén las validaciones de otro dto
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
}

//Va a utilizar las mismas validaciones que CreateProductDto pero serán opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
