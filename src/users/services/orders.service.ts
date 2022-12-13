import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('products')
      .populate('customer')
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`No existe la orden con el id ${id}`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`No existe la orden con el id ${id}`);
    }
    return order;
  }

  async delete(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`No existe la orden con el id ${id}`);
    }
    return `El usuario con el id ${id} fue eliminado satisfactoriamente`;
  }
}
