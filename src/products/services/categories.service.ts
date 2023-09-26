import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'category1',
      productsId: [1, 3, 5, 7],
    },
  ];

  findAllCategory() {
    const getNameCategories = () => {
      const nameCategories = this.categories.map((element) => element.name);
      return nameCategories;
    };
    return getNameCategories();
  }

  findOne(id: number) {
    const category = this.categories.find((element) => element.id === id);
    if (!category) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    return category;
  }

  findProductCategory(id: number, productId: number) {
    const category = this.categories.find((element) => element.id === id);
    if (!category) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    const product = category.productsId.find(
      (element) => element === productId,
    );
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${productId} no existe en la categoría ${category.name}`,
      );
    }
    return {
      id: category.id,
      name: category.name,
      productId: productId,
    };
  }

  create(payload: CreateCategoryDto) {
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
  }
}
