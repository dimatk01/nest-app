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
/* The `SynchronizeProductsService` class is responsible for synchronizing products by updating
existing ones or creating new ones based on the provided data. */
export class SynchronizeProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly sizeRepository: SizeRepository,
    private readonly modelRepository: ModelRepository,
  ) {}


/**
 * The `synchronize` function takes an array of `MappedProducts` objects, retrieves existing products
 * from the database based on their article, updates their sizes if they exist, or creates new products
 * if they don't, and saves the changes to the database.
 * @param {MappedProducts[]} mappedProducts - An array of objects representing mapped products.
 */
  async synchronize(mappedProducts: MappedProducts[]) {
    const handler = async (item) => {
      let product = await this.productRepository.findOne({
        where: { article: item?.article },
        relations: ['sizes'],
      });

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

/**
 * The function `getProductSizes` takes an array of sizes and checks if each size already exists in the
 * database, if not, it creates a new size and saves it in the database.
 * @param {string[]} sizesFromSheet - An array of strings representing sizes obtained from a sheet.
 * @returns The `getProductSizes` function is returning a promise that resolves to an array of `Size`
 * objects.
 */
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

  /**
   * The function `getProductModel` retrieves an existing model from a repository based on a given
   * name, or creates a new model if it doesn't exist.
   * @param {string} modelFromSheet - The parameter `modelFromSheet` is a string that represents the
   * name of a model obtained from a sheet.
   * @returns The function `getProductModel` returns either an existing model object from the model
   * repository if it already exists in the database, or a newly created model object if it does not
   * exist in the database.
   */
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
