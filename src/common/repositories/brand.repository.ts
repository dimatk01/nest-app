import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Brand } from '../../../db/entities';

@Injectable()
export class BrandRepository extends Repository<Brand> {
  constructor(private readonly dataSource: DataSource) {
    super(Brand, dataSource.createEntityManager());
  }
}
