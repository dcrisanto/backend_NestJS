import { Product } from 'src/entities/product.entity';

export class CreateBrandDto {
  readonly name: string;
  readonly products: Array<Product>;
}

export class UpdateBrandDto {
  readonly name?: string;
  readonly products: Array<Product>;
}
