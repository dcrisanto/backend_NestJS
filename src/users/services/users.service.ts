import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import { Model } from 'mongoose';

import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
//como se ha exportado como export default no es necesario los {}
import config from '../../config';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    //@Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
    @Inject(config.KEY) private config_: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    //también lo puedes tipar indicando que recibes un string
    const apiKey = this.configService.get<string>('API_KEY');
    console.log(apiKey);
    const nameDataBase = this.config_.database.name;
    console.log(nameDataBase);
    return this.userModel.find().exec();
  }

  async findUser(id: string) {
    const user = await this.userModel.findById(id).exec();
    console.log(user);
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return user;
  }

  async getOrdersByUser(id: string) {
    const user = await this.findUser(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  /* create(payload: CreateUserDto) {
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
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    this.users.splice(index, 1);
    return `El usuario con el id ${id} fue eliminado satisfactoriamente`;
  }

  getTasks(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  } */
}
