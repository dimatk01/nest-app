import { DataSource, Repository } from 'typeorm';
import { Size } from '../../../db/entities';
export declare class SizeRepository extends Repository<Size> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
