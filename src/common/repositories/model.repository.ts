import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Model } from '../../../db/entities';

@Injectable()
export class ModelRepository extends Repository<Model> {
  constructor(private readonly dataSource: DataSource) {
    super(Model, dataSource.createEntityManager());
  }
}
