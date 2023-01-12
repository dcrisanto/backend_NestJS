import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column()
  products: Array<Product>;
}
