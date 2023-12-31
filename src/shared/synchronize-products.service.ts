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
/* The `SynchronizeProductsService` class is responsible for synchronizing products, sizes, and models
between a spreadsheet and a database. */
export class SynchronizeProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly sizeRepository: SizeRepository,
    private readonly modelRepository: ModelRepository,
  ) {}


 /**
  * The `synchronize` function takes in an array of mapped products, sizes, and models, retrieves sizes
  * and models from the database, and updates or creates products based on the provided data.
  * @param {MappedProducts[]} mappedProducts - An array of objects representing mapped products. Each
  * object should have properties such as name, price, article, model, and sizes.
  * @param {string[]} sizes - An array of strings representing the sizes of the products.
  * @param {string[]} models - An array of strings representing the models of the products.
  */
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

/**
 * The function `getProductSizes` takes an array of existing sizes and an array of sizes from a sheet,
 * and returns an array of existing sizes that match the sizes from the sheet.
 * @param {Size[]} existingSizes - An array of objects representing existing sizes. Each object has a
 * "size" property that represents the size value.
 * @param {string[]} sizesFromSheet - An array of strings representing sizes obtained from a sheet.
 * @returns an array of Size objects.
 */
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

 /**
  * The function `getSizesFromDb` takes an array of sizes as input, checks if each size already exists
  * in the database, and either returns the existing size or creates a new size and saves it to the
  * database.
  * @param {string[]} sizesFromSheet - An array of strings representing sizes obtained from a sheet.
  * @returns The function `getSizesFromDb` returns a promise that resolves to an array of sizes.
  */
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

/**
 * The function `getModelFromDb` retrieves or creates models from a database based on an array of model
 * names.
 * @param {string[]} modelFromSheet - An array of strings representing models obtained from a sheet.
 * @returns a Promise that resolves to an array of models.
 */
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

/**
 * The function `getProductModels` takes an array of existing models and a string of models from a
 * sheet, and returns the first existing model that matches the name from the sheet.
 * @param {Model[]} existingModel - An array of existing Model objects.
 * @param {string} modelsFromSheet - The `modelsFromSheet` parameter is a string that represents the
 * name of a model.
 * @returns the existing model object that matches the name specified in the modelsFromSheet parameter.
 */
  getProductModels(existingModel: Model[], modelsFromSheet: string) {
    try {
      return existingModel.find((em: Model) => em.name === modelsFromSheet);
    } catch (e) {
      console.log({ getProductModels: e?.message });
    }
  }
}
