import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Size } from '../../../db/entities';

@Injectable()
export class SizeRepository extends Repository<Size> {
  constructor(private readonly dataSource: DataSource) {
    super(Size, dataSource.createEntityManager());
  }
}
