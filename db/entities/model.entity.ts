import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand, Product } from './index';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand: Brand;

  @OneToMany(() => Product, (product) => product.model)
  products: Product[];
}
