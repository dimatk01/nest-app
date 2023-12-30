import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product, SubCategory } from './index';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategories: SubCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
