import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private counterProductId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Renzo Costa',
      products: [
        {
          id: 1,
          name: 'cartera',
          category: 'accesorios',
          description: 'productos de cuero de calidad',
          price: 200,
          stock: 50,
          image: '',
        },
      ],
    },
  ];

  findAll() {
    const brands = this.brands.map((element) => element.name);
    return brands;
  }

  findOne(id: number, productId: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`No existe la marca con el id ${id}`);
    }
    const product = brand.products.find((item) => item.id === productId);
    if (!product) {
      throw new NotFoundException(
        `El producto con el id ${productId} no existe`,
      );
    }
    return {
      id: brand.id,
      name: brand.name,
      product: product,
    };
  }

  create(payload: CreateBrandDto) {
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
  }
}
