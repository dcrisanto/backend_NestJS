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

  create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`No existe la categoría con el id ${id}`);
    }
    return brand;
  }

  async delete(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();
    if (!brand) {
      throw new NotFoundException(`No existe la categoría con el id ${id}`);
    }
    return `La marca con el id ${id} fue eliminado satisfactoriamente`;
  }
}
