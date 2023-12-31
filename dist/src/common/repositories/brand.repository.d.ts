import { DataSource, Repository } from 'typeorm';
import { Brand } from '../../../db/entities';
export declare class BrandRepository extends Repository<Brand> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
