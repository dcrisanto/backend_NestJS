export class CreateCategoryDto {
  readonly name: string;
  readonly productsId: Array<number>;
}

export class UpdateCategoryDto {
  readonly name?: string;
  readonly productsId?: Array<number>;
}
