import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  readonly productsId: Array<number>;
}

export class UpdateCategoryDto {
  readonly name?: string;
  readonly productsId?: Array<number>;
}
