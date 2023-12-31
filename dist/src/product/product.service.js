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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../common/repositories");
const category_repository_1 = require("../common/repositories/category.repository");
const entities_1 = require("../../db/entities");
const brand_repository_1 = require("../common/repositories/brand.repository");
const subcategory_repository_1 = require("../common/repositories/subcategory.repository");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository, subCategory, brandRepository, modelRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.subCategory = subCategory;
        this.brandRepository = brandRepository;
        this.modelRepository = modelRepository;
    }
    async create(createProductDto) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: createProductDto.categoryId },
            });
            const subcategory = await this.subCategory.findOne({
                where: { id: createProductDto.subcategoryId },
            });
            const brand = await this.brandRepository.findOne({
                where: { id: createProductDto.brandId },
            });
            const model = await this.modelRepository.findOne({
                where: { id: createProductDto.modelId },
            });
            const product = new entities_1.Product();
            product.article = createProductDto.article;
            product.price = createProductDto.price;
            product.name = createProductDto.name;
            product.category = category;
            product.subcategory = subcategory;
            product.brand = brand;
            product.model = model;
            return await this.productRepository.save(product);
        }
        catch (e) {
            console.log({ errorCreateProduct: e?.message });
            throw new common_1.BadRequestException('Error create product');
        }
    }
    async findAll(query) {
        try {
            const { search, page, perPage, sizes, model, subcategory, brand, category, } = query;
            return await this.productRepository.findAll(search, +page, +perPage, sizes, model, subcategory, brand, category);
        }
        catch (e) {
            console.log({ errorFindAll: e?.message });
            throw new common_1.BadRequestException('Error find all products');
        }
    }
    async findOne(id) {
        try {
            return await this.productRepository.findOne({
                where: { id },
                relations: {
                    subcategory: true,
                    category: true,
                    brand: true,
                    sizes: true,
                    model: true,
                },
            });
        }
        catch (e) {
            console.log({ findOneProduct: e?.message });
            throw new common_1.BadRequestException('Error find product');
        }
    }
    async update(id, updateProductDto) {
        try {
            const { article, name, price } = updateProductDto;
            const category = await this.categoryRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });
            const subcategory = await this.subCategory.findOne({
                where: { id: updateProductDto.subcategoryId },
            });
            const brand = await this.brandRepository.findOne({
                where: { id: updateProductDto.brandId },
            });
            const model = await this.modelRepository.findOne({
                where: { id: updateProductDto.modelId },
            });
            return await this.productRepository.update({ id }, {
                article,
                name,
                price,
                model,
                subcategory,
                brand,
                category,
            });
        }
        catch (e) {
            console.log({ updateProduct: e?.message });
            throw new common_1.BadRequestException('Error update product');
        }
    }
    async remove(id) {
        try {
            const product = await this.productRepository.findOneByOrFail({ id });
            return await this.productRepository.remove(product);
        }
        catch (e) {
            console.log({ removeProduct: e?.message });
            throw new common_1.BadRequestException('Error remove product');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.ProductRepository,
        category_repository_1.CategoryRepository,
        subcategory_repository_1.SubCategoryRepository,
        brand_repository_1.BrandRepository,
        repositories_1.ModelRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map