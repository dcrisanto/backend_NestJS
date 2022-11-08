import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product1',
      description: 'description product',
      price: 260,
      stock: 12,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((element) => element.id == id);
    if (!product) {
      //manipulando los errores propios de nestJS
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return product;
  }

  create(payload: any) {
    this.counterId++;
    const newProduct: Product = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  search(name: string) {
    const includeSearch = this.products.filter(
      (element) => element.name == name,
    );
    if (includeSearch.length == 0) {
      throw new NotFoundException(
        `No existen coincidencias con el nombre ${name}`,
      );
    }
    return includeSearch;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id == id);
    if (index == -1) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index == -1) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    this.products.splice(index, 1);
    return `El producto con id ${id} fue eliminado satisfactoriamente`;
  }
}
