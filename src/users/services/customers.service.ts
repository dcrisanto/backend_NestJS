import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`No existe el cliente con el id ${id}`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  async update(id: string, changes: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`El cliente con el id ${id} no existe`);
    }
    return customer;
  }

  async delete(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new NotFoundException(`El cliente con el id ${id} no existe`);
    }
    return `El cliente con el id ${id} fue eliminado satisfactoriamente`;
  }
}
