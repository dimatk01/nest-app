import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ModelRepository, ProductRepository } from '../common/repositories';
import { CategoryRepository } from '../common/repositories/category.repository';
import { SubCategoryRepository } from '../common/repositories/subcategory.repository';
import { BrandRepository } from '../common/repositories/brand.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CategoryRepository,
    SubCategoryRepository,
    BrandRepository,
    ModelRepository,
  ],
})
export class ProductModule {}
