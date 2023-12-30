import { Injectable } from '@nestjs/common';
import { MappedProducts } from '../common/types/mappedProduct';
import { ProductRepository } from '../common/repositories/product.repository';

@Injectable()
export class SynchronizeProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  public synchronize(mappedProducts: MappedProducts[]) {
    mappedProducts.forEach(async (item) => {
      // Для отриманих товарів з гугл таблиць перевіряємо чи є в нашій БД
      const product = await this.productRepository.findOne({
        where: { article: item?.article },
      });
      console.log(product);
      // if (product) {
      //   product.sizes
      // }
    });
  }
}
