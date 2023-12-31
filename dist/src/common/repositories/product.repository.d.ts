import { DataSource, Repository } from 'typeorm';
import { Product } from '../../../db/entities';
export declare class ProductRepository extends Repository<Product> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(search: string, page: number, perPage: number, sizes: string, model: string, subcategory: string, brand: string, category: string): Promise<{
        result: Product[];
        count: number;
    }>;
}
