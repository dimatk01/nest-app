import { DataSource, Repository } from 'typeorm';
import { Category } from '../../../db/entities';
export declare class CategoryRepository extends Repository<Category> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
