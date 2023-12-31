import { DataSource, Repository } from 'typeorm';
import { SubCategory } from '../../../db/entities';
export declare class SubCategoryRepository extends Repository<SubCategory> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
