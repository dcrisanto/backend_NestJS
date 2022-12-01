import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: Array<string>;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
