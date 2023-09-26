import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers = [
    {
      id: 1,
      name: 'Rosario',
      email: 'rosario.perez@gmail.com',
      user: 'rperez',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((element) => element.id === id);
    if (!customer) {
      throw new NotFoundException(`No existe el cliente con el id ${id}`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
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
  }
}
