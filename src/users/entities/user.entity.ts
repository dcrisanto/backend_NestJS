import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  user: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'text' })
  position: string;
}
