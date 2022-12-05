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
    const product = this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${productId} no existe`,
      );
    }
    return {
      category,
      product,
    };
  }

  create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(id: string, changes: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`No existe la categoría con el id ${id}`);
    }
    return category;
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndRemove(id).exec();
    if (!category) {
      throw new NotFoundException(`No existe la categoría con el id ${id}`);
    }
    return `La categoría con el id ${id} fue eliminado satisfactoriamente`;
  }
}
