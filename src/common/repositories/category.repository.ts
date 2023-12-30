import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../../../db/entities';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
