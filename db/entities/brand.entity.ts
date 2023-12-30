import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Model, Product } from './index';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
