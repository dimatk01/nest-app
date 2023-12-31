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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../../db/entities");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Product, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findAll(search, page, perPage, sizes, model, subcategory, brand, category) {
        let query = this.createQueryBuilder('product')
            .leftJoinAndSelect('product.sizes', 'sizes')
            .leftJoinAndSelect('product.model', 'model')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.subcategory', 'subcategory')
            .leftJoinAndSelect('product.brand', 'brand');
        const whereCondition = (field) => [
            `LOWER(CAST(product.${field} as VARCHAR)) ILIKE :search`,
            { search: `%${search.toLocaleLowerCase()}%` },
        ];
        if (search) {
            query = query.andWhere(new typeorm_1.Brackets((qb) => {
                qb.where(...whereCondition('name'))
                    .orWhere(...whereCondition('article'))
                    .orWhere(...whereCondition('price'));
            }));
        }
        if (sizes) {
            query.andWhere('sizes.size = :sizes', { sizes });
        }
        if (model) {
            query.andWhere('model.name = :model', { model });
        }
        if (category) {
            query.andWhere('category.name = :category', { category });
        }
        if (subcategory) {
            query.andWhere('subcategory.name = :subcategory', { subcategory });
        }
        if (brand) {
            query.andWhere('brand.name = :brand', { brand });
        }
        const offset = page * perPage;
        const [result, count] = await query
            .offset(offset)
            .orderBy('product.id', 'DESC')
            .limit(perPage)
            .getManyAndCount();
        return {
            result,
            count,
        };
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map