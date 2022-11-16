import { Product } from 'src/products/entities/product.entity';

export class CreateBrandDto {
  readonly name: string;
  readonly products: Array<Product>;
}

export class UpdateBrandDto {
  readonly name?: string;
  readonly products: Array<Product>;
}
