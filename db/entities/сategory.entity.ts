import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product, Subcategory } from './index';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
