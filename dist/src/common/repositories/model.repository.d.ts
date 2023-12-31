import { DataSource, Repository } from 'typeorm';
import { Model } from '../../../db/entities';
export declare class ModelRepository extends Repository<Model> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
