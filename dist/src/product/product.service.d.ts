import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product.query.dto';
import { ModelRepository, ProductRepository } from '../common/repositories';
import { CategoryRepository } from '../common/repositories/category.repository';
import { Product } from '../../db/entities';
import { BrandRepository } from '../common/repositories/brand.repository';
import { SubCategoryRepository } from '../common/repositories/subcategory.repository';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    private readonly subCategory;
    private readonly brandRepository;
    private readonly modelRepository;
    constructor(productRepository: ProductRepository, categoryRepository: CategoryRepository, subCategory: SubCategoryRepository, brandRepository: BrandRepository, modelRepository: ModelRepository);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(query: ProductQueryDto): Promise<{
        result: Product[];
        count: number;
    }>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Product>;
}
