import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { Category } from 'src/products/entities/category.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAllCategory() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    return category;
  }

  async findProductCategory(id: string, productId: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    const idProduct = category.products.find((item) => item === productId);
    if (!idProduct) {
      throw new NotFoundException(
        `El producto con el id ${productId} no existe`,
      );
    }
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${productId} no está disponible para la categoría ${category.name}`,
      );
    }
    return {
      id,
      category: category.name,
      product,
    };
  }

  /*   create(payload: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    this.categories.splice(index, 1);
    return `La categoría con el id ${id} fue eliminado satisfactoriamente`;
  } */
}
