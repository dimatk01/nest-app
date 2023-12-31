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


  async synchronize(
    mappedProducts: MappedProducts[],
    sizes: string[],
    models: string[],
  ) {
    const sizesFromDb = await this.getSizesFromDb(sizes);
    const modelsFromDb = await this.getModelFromDb(models);
    const handler = async (item) => {
      const sizes = this.getProductSizes(sizesFromDb, item?.sizes);
      let product = await this.productRepository.findOne({
        where: { article: item?.article },
        relations: ['sizes'],
      });
      if (product) {
        product.sizes = sizes;
      } else {
        product = new Product();
        product.name = item?.name;
        product.price = item?.price;
        product.article = item?.article;
        product.model = this.getProductModels(modelsFromDb, item?.model);
        product.sizes = sizes;
      }
      await this.productRepository.save(product);
    };
    await Promise.all(mappedProducts.map(handler));
  }

  getProductSizes(existingSizes: Size[], sizesFromSheet: string[]) {
    try {
      const getOrCreateSize = (size: string) => {
        return existingSizes.find((es) => es.size === size);
      };

      return sizesFromSheet.map(getOrCreateSize);
    } catch (e) {
      console.log({ getProductSizes: e?.message });
    }
  }

  async getSizesFromDb(sizesFromSheet: string[]) {
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
        }
      };

      return await Promise.all(sizesFromSheet.map(getOrCreateSize));
    } catch (e) {
      console.log({ getSizesFromDb: e?.message });
    }
  }

  async getModelFromDb(modelFromSheet: string[]) {
    try {
      const getOrCreateModel = async (model: string) => {
        const existingModels = await this.modelRepository.find({
          where: { name: In(modelFromSheet) },
        });

        const existingModel = existingModels.find((em) => em.name === model);
        if (existingModel) {
          return existingModel;
        } else {
          const newModel = new Model();
          newModel.name = model;
          return await this.modelRepository.save(newModel);
        }
      };

      return await Promise.all(modelFromSheet.map(getOrCreateModel));
    } catch (e) {
      console.log({ getModelFromDb: e?.message });
    }
  }

  getProductModels(existingModel: Model[], modelsFromSheet: string) {
    try {
      return existingModel.find((em: Model) => em.name === modelsFromSheet);
    } catch (e) {
      console.log({ getProductModels: e?.message });
    }
  }
}
