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

  /* create(payload: CreateCustomerDto) {
    this.counterId++;
    const customer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(customer);
    return customer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`El cliente con el id ${id} no existe`);
    }
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`El cliente con el id ${id} no existe`);
    }
    this.customers.splice(index, 1);
    return `El cliente con el id ${id} fue eliminado satisfactoriamente`;
  } */
}
