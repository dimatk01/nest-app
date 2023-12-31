import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product.query.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("../../db/entities").Product>;
    findAll(query: ProductQueryDto): Promise<{
        result: import("../../db/entities").Product[];
        count: number;
    }>;
    findOne(id: string): Promise<import("../../db/entities").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("../../db/entities").Product>;
}
