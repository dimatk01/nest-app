import { Injectable } from '@nestjs/common';
import { MappedProducts } from '../common/types/mappedProduct';
import { Model, Product, Size } from '../../db/entities';
import { In } from 'typeorm';
import {
  ModelRepository,
  ProductRepository,
  SizeRepository,
} from '../common/repositories';

@Injectable()
export class SynchronizeProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly sizeRepository: SizeRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  async synchronize(mappedProducts: MappedProducts[]) {
    // Для отриманих товарів з гугл таблиць перевіряємо чи є в нашій БД
    const handler = async (item) => {
      let product = await this.productRepository.findOne({
        where: { article: item?.article },
        relations: ['sizes'],
      });

      //Якщо продукт існує перевіряємо його розміри
      if (product) {
        product.sizes = await this.getProductSizes(item?.sizes);
      } else {
        product = new Product();
        product.name = item?.name;
        product.price = item?.price;
        product.article = item?.article;
        product.model = await this.getProductModel(item?.model);
        product.sizes = await this.getProductSizes(item?.sizes);
      }
      console.log(product);
      await this.productRepository.save(product);
    };
    await Promise.all(mappedProducts.map(handler));
  }

  async getProductSizes(sizesFromSheet: string[]) {
    try {
      const getOrCreateSize = async (size: string) => {
        const existingSizes = await this.sizeRepository.find({
          where: { size: In(sizesFromSheet) },
        });

        const existingSize = existingSizes.find((es) => es.size === size);
        if (existingSize) {
          return existingSize;
        } else {
          const newSize = new Size();
          newSize.size = size;
          return await this.sizeRepository.save(newSize);
          // console.log(t);
        }
      };

      return await Promise.all(sizesFromSheet.map(getOrCreateSize));
    } catch (e) {
      console.log({ getProductSizes: e?.message });
    }
  }

  async getProductModel(modelFromSheet: string) {
    try {
      const existingModels = await this.modelRepository.find({
        where: { name: modelFromSheet },
      });
      const existingModel = existingModels.find(
        (em) => em.name === modelFromSheet,
      );
      if (existingModel) {
        return existingModel;
      } else {
        const newModel = new Model();
        newModel.name = modelFromSheet;
        return await this.modelRepository.save(newModel);
      }
    } catch (e) {
      console.log({ getProductModel: e?.message });
    }
  }
}
