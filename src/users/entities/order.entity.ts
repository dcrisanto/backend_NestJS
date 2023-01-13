import { type } from 'os';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order {
  @Column()
  date: Date;

  @Column()
  user: User;

  @Column()
  products: Product[];
}
