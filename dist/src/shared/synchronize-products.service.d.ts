import { MappedProducts } from '../common/types/mappedProduct';
import { Model, Size } from '../../db/entities';
import { ModelRepository, ProductRepository, SizeRepository } from '../common/repositories';
export declare class SynchronizeProductsService {
    private readonly productRepository;
    private readonly sizeRepository;
    private readonly modelRepository;
    constructor(productRepository: ProductRepository, sizeRepository: SizeRepository, modelRepository: ModelRepository);
    synchronize(mappedProducts: MappedProducts[], sizes: string[], models: string[]): Promise<void>;
    getProductSizes(existingSizes: Size[], sizesFromSheet: string[]): Size[];
    getSizesFromDb(sizesFromSheet: string[]): Promise<Size[]>;
    getModelFromDb(modelFromSheet: string[]): Promise<Model[]>;
    getProductModels(existingModel: Model[], modelsFromSheet: string): Model;
}
