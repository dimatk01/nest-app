import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, ObjectLiteral, Repository } from 'typeorm';
import { Product } from '../../../db/entities';
import { ProductQueryDto } from '../../product/dto/product.query.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findAll(
    search: string,
    page: number,
    perPage: number,
    sizes: string,
    model: string,
    subcategory: string,
    brand: string,
    category: string,
  ) {
    let query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.model', 'model')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.subcategory', 'subcategory')
      .leftJoinAndSelect('product.brand', 'brand');

    const whereCondition = (
      field: string,
    ): [where: string, parameters: ObjectLiteral] => [
      `LOWER(CAST(product.${field} as VARCHAR)) ILIKE :search`,
      { search: `%${search.toLocaleLowerCase()}%` },
    ];
    if (search) {
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where(...whereCondition('name'))
            .orWhere(...whereCondition('article'))
            .orWhere(...whereCondition('price'));
        }),
      );
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
}
