import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

//Decorador Entity para que la clase sea tratada por typeORM
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  /* @Column()
  productsId: number[]; */
}
