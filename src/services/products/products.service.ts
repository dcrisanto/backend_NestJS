import { Injectable } from '@nestjs/common';
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
    return this.products.find((element) => element.id == id);
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
    return this.products.filter((element) => element.name == name);
  }

  update(id: number, payload: any) {
    let product = this.findOne(id);
    if (!product) {
      return {
        message: `Producto con id ${id} no existe`,
      };
    } else {
      const index = this.products.indexOf(product);
      product = {
        ...product,
        ...payload,
      };
      this.products[index] = product;
      return product;
    }
  }

  delete(id) {
    let productId = this.findOne(id);
    if (!productId) {
      return {
        message: `Producto con id ${id} no existe`,
      };
    } else {
      const product = this.findOne(id);
      const index = this.products.indexOf(product);
      this.products.splice(index, index);
    }
    return `El producto con id ${id} fue eliminado satisfactoriamente`;
  }
}
