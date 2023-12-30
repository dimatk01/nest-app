import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product.query.dto';
import { ProductRepository } from '../common/repositories';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
