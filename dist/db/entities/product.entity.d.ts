import { Brand, Category, Model, Size, SubCategory } from './index';
export declare class Product {
    id: number;
    article: string;
    name: string;
    price: number;
    sizes: Size[];
    category: Category;
    subcategory: SubCategory;
    brand: Brand;
    model: Model;
}
