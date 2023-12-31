"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronizeProductsService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../db/entities");
const typeorm_1 = require("typeorm");
const repositories_1 = require("../common/repositories");
let SynchronizeProductsService = class SynchronizeProductsService {
    constructor(productRepository, sizeRepository, modelRepository) {
        this.productRepository = productRepository;
        this.sizeRepository = sizeRepository;
        this.modelRepository = modelRepository;
    }
    async synchronize(mappedProducts, sizes, models) {
        const sizesFromDb = await this.getSizesFromDb(sizes);
        const modelsFromDb = await this.getModelFromDb(models);
        const handler = async (item) => {
            const sizes = this.getProductSizes(sizesFromDb, item?.sizes);
            let product = await this.productRepository.findOne({
                where: { article: item?.article },
                relations: ['sizes'],
            });
            if (product) {
                product.sizes = sizes;
            }
            else {
                product = new entities_1.Product();
                product.name = item?.name;
                product.price = item?.price;
                product.article = item?.article;
                product.model = this.getProductModels(modelsFromDb, item?.model);
                product.sizes = sizes;
            }
            await this.productRepository.save(product);
        };
        await Promise.all(mappedProducts.map(handler));
    }
    getProductSizes(existingSizes, sizesFromSheet) {
        try {
            const getOrCreateSize = (size) => {
                return existingSizes.find((es) => es.size === size);
            };
            return sizesFromSheet.map(getOrCreateSize);
        }
        catch (e) {
            console.log({ getProductSizes: e?.message });
        }
    }
    async getSizesFromDb(sizesFromSheet) {
        try {
            const getOrCreateSize = async (size) => {
                const existingSizes = await this.sizeRepository.find({
                    where: { size: (0, typeorm_1.In)(sizesFromSheet) },
                });
                const existingSize = existingSizes.find((es) => es.size === size);
                if (existingSize) {
                    return existingSize;
                }
                else {
                    const newSize = new entities_1.Size();
                    newSize.size = size;
                    return await this.sizeRepository.save(newSize);
                }
            };
            return await Promise.all(sizesFromSheet.map(getOrCreateSize));
        }
        catch (e) {
            console.log({ getSizesFromDb: e?.message });
        }
    }
    async getModelFromDb(modelFromSheet) {
        try {
            const getOrCreateModel = async (model) => {
                const existingModels = await this.modelRepository.find({
                    where: { name: (0, typeorm_1.In)(modelFromSheet) },
                });
                const existingModel = existingModels.find((em) => em.name === model);
                if (existingModel) {
                    return existingModel;
                }
                else {
                    const newModel = new entities_1.Model();
                    newModel.name = model;
                    return await this.modelRepository.save(newModel);
                }
            };
            return await Promise.all(modelFromSheet.map(getOrCreateModel));
        }
        catch (e) {
            console.log({ getModelFromDb: e?.message });
        }
    }
    getProductModels(existingModel, modelsFromSheet) {
        try {
            return existingModel.find((em) => em.name === modelsFromSheet);
        }
        catch (e) {
            console.log({ getProductModels: e?.message });
        }
    }
};
exports.SynchronizeProductsService = SynchronizeProductsService;
exports.SynchronizeProductsService = SynchronizeProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.ProductRepository,
        repositories_1.SizeRepository,
        repositories_1.ModelRepository])
], SynchronizeProductsService);
//# sourceMappingURL=synchronize-products.service.js.map