import { Product } from './product.entity';

export class Brand {
  id: number;
  name: string;
  products: Array<Product>;
}
