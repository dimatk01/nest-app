"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const repositories_1 = require("../common/repositories");
const category_repository_1 = require("../common/repositories/category.repository");
const subcategory_repository_1 = require("../common/repositories/subcategory.repository");
const brand_repository_1 = require("../common/repositories/brand.repository");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController],
        providers: [
            product_service_1.ProductService,
            repositories_1.ProductRepository,
            category_repository_1.CategoryRepository,
            subcategory_repository_1.SubCategoryRepository,
            brand_repository_1.BrandRepository,
            repositories_1.ModelRepository,
        ],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map