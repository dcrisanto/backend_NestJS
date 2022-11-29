import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`No existe la marca con el id ${id}`);
    }
    return brand;
  }

  async findBrandProduct(id: string, productId: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`No existe la marca con el id ${id}`);
    }
    const idProduct = brand.products.find((item) => item === productId);
    if (!idProduct) {
      throw new NotFoundException(
        `El producto con el id ${productId} no existe`,
      );
    }
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${productId} no está disponible para la marca ${brand.name}`,
      );
    }
    return {
      id,
      name: brand.name,
      product,
    };
  }

  /* create(payload: CreateBrandDto) {
    this.counterId++;
    if (!payload.products) {
      const newBrand = {
        id: this.counterId,
        ...payload,
      };
    }
    const listProducts = payload.products;
    const addProductsIds = listProducts.map((item) =>
      Object.defineProperty(item, 'id', {
        value: this.counterProductId++,
        enumerable: true,
      }),
    );
    const newBrand = {
      id: this.counterId,
      name: payload.name,
      products: addProductsIds,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.brands.find((item) => item.id === id);
    const index = this.brands.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`La marca con el id ${id} no existe`);
    }
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`No existe la marca con el id ${id}`);
    }
    this.brands.splice(index, 1);
    return `La marca con el id ${id} fue eliminado satisfactoriamente`;
  } */
}
