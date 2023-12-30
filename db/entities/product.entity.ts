import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand, Category, Model, Size, SubCategory } from './index';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  article: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Size, { cascade: true, eager: true })
  @JoinTable()
  sizes: Size[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  subcategory: SubCategory;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Model, (model) => model.products)
  model: Model;
}
