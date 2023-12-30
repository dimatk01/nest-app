import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './index';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
