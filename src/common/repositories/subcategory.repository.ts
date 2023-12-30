import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubCategory } from '../../../db/entities';

@Injectable()
export class SubCategoryRepository extends Repository<SubCategory> {
  constructor(private readonly dataSource: DataSource) {
    super(SubCategory, dataSource.createEntityManager());
  }
}
