import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Dorelly',
      user: 'dcrisanto',
      email: 'dorelly.crisanto@gmail.com',
      position: 'seller',
    },
  ];

  findAll() {
    console.log(this.apiKey);
    return this.users;
  }

  findUser(id: number) {
    const user = this.users.find((element) => element.id === id);
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return user;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findUser(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findUser(id);
    const index = this.users.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`Se usuario con el id ${id} no existe`);
    }
    this.users.splice(index, 1);
    return `El usuario con el id ${id} fue eliminado satisfactoriamente`;
  }
}
