import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      //manipulando los errores propios de nestJS
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return product;
  }

  /* create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  search(name: string) {
    const includeSearch = this.products.filter(
      (element) => element.name === name,
    );
    if (includeSearch.length == 0) {
      throw new NotFoundException(
        `No existen coincidencias con el nombre ${name}`,
      );
    }
    return includeSearch;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
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
    const index = this.products.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    this.products.splice(index, 1);
    return `El producto con id ${id} fue eliminado satisfactoriamente`;
  } */
}
