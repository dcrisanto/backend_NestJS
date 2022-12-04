import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  //persistencia en db
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const filter: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        //gte: mayor-igual, lte: menor-igual
        filter.price = { $gte: minPrice, $lte: maxPrice };
      }
      return this.productModel.find(filter).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    //es una promesa por lo que el método debe ser asíncrono y devolver un await
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      //manipulando los errores propios de nestJS
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    //creando una instancia del model productModel
    const newProduct = new this.productModel(data);
    //devuelve un modelo y lo salvamos
    return newProduct.save();
  }

  async search(searchInput: string) {
    const products = this.productModel
      .find({ $text: { $search: searchInput } })
      .exec();
    return products;
  }

  async update(id: string, changes: UpdateProductDto) {
    //con set indica que sólo modiique esos atributos y los una al modelo que está consultando, pero no cambia todo el modelo como tal
    //con new:true indico que queremos que nos envíe el producto actualizado
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }
    return `El producto con el id ${id} fue eliminado satisfactoriamente`;
  }
}
