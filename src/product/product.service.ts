import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product.query.dto';
import { ModelRepository, ProductRepository } from '../common/repositories';
import { CategoryRepository } from '../common/repositories/category.repository';
import { Product } from '../../db/entities';
import { BrandRepository } from '../common/repositories/brand.repository';
import { SubCategoryRepository } from '../common/repositories/subcategory.repository';

@Injectable()
/* The `ProductService` class is responsible for handling CRUD operations for products, including
creating, finding, updating, and removing products. */
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly subCategory: SubCategoryRepository,
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  /**
   * The function creates a new product by retrieving category, subcategory, brand, and model
   * information from their respective repositories and saving the product to the product repository.
   * @param {CreateProductDto} createProductDto - The `createProductDto` parameter is an object that
   * contains the data needed to create a new product
   * @returns The `create` function is returning the saved product object.
   */
  async create(createProductDto: CreateProductDto) {
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
      const product = new Product();
      product.article = createProductDto.article;
      product.price = createProductDto.price;
      product.name = createProductDto.name;
      product.category = category;
      product.subcategory = subcategory;
      product.brand = brand;
      product.model = model;

      return await this.productRepository.save(product);
    } catch (e) {
      console.log({ errorCreateProduct: e?.message });
      throw new BadRequestException('Error create product');
    }
  }



/**
 * The `findAll` function takes a `ProductQueryDto` object as a parameter and uses its properties to
 * query the product repository for matching products, returning the results.
 * @param {ProductQueryDto} query - The `query` parameter is an object of type `ProductQueryDto` which
 * contains the following properties: search , page number,
 * items per page, sizes, model, subcategory, brand, and category.
 * @returns The method is returning the result of calling the `findAll` method of the
 * `productRepository` with the provided parameters.
 */
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
      throw new BadRequestException('Error find all products');
    }
  }

/**
 * The `findOne` function retrieves a product from the database based on its ID, along with its related
 * subcategory, category, brand, sizes, and model.
 * @param {number} id - The `id` parameter is the unique identifier of the product that we want to
 * find. It is of type `number`.
 * @returns The `findOne` method is returning the result of the `productRepository.findOne` method.
 */
  async findOne(id: number) {
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
    } catch (e) {
      console.log({ findOneProduct: e?.message });
      throw new BadRequestException('Error find product');
    }
  }

  /**
   * The function updates a product in the database with the provided information.
   * @param {number} id - The `id` parameter is the identifier of the product that needs to be updated.
   * It is of type `number`.
   * @param {UpdateProductDto} updateProductDto - The `updateProductDto` parameter is an object that
   * contains the data to update a product. It typically includes properties such as `categoryId`,
   * `subcategoryId`, `brandId`, `modelId`, and other properties specific to the product being updated.
   * @returns The `update` method is returning the result of the `productRepository.update` method.
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
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

      return await this.productRepository.update(
        { id },
        {
          ...updateProductDto,
          model,
          subcategory,
          brand,
          category,
        },
      );
    } catch (e) {
      console.log({ updateProduct: e?.message });
      throw new BadRequestException('Error update product');
    }
  }

/**
 * The `remove` function asynchronously removes a product from the product repository by its ID, and
 * throws a BadRequestException if an error occurs.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
 * product that needs to be removed.
 * @returns The `remove` method is returning the result of the `productRepository.remove(product)`
 * function call.
 */
  async remove(id: number) {
    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      return await this.productRepository.remove(product);
    } catch (e) {
      console.log({ removeProduct: e?.message });
      throw new BadRequestException('Error remove product');
    }
  }
}
