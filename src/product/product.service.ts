import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product.query.dto';
import { ModelRepository, ProductRepository } from '../common/repositories';
import { CategoryRepository } from '../common/repositories/category.repository';
import { Product } from '../../db/entities';
import { BrandRepository } from '../common/repositories/brand.repository';
import { SubCategoryRepository } from '../common/repositories/subcategory.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly subCategory: SubCategoryRepository,
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
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
    const product = new Product();
    product.article = createProductDto.article;
    product.price = createProductDto.price;
    product.name = createProductDto.name;
    product.category = category;
    product.subcategory = subcategory;
    product.brand = brand;
    product.model = model;

    return await this.productRepository.save(product);
  }

  async findAll(query: ProductQueryDto) {
    try {
      const {
        search,
        page,
        perPage,
        sizes,
        model,
        subcategory,
        brand,
        category,
      } = query;
      return await this.productRepository.findAll(
        search,
        +page,
        +perPage,
        sizes,
        model,
        subcategory,
        brand,
        category,
      );
    } catch (e) {
      console.log({ errorFindAll: e?.message });
    }
  }

  async findOne(id: number) {
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
