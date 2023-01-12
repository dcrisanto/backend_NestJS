import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
//como se ha exportado como export default no es necesario los {}
import config from '../../config';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    //@Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
    @Inject(config.KEY) private config_: ConfigType<typeof config>,
    @Inject('PG') private clientPG: Client,
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

  getTasks() {
    //retornando una Promesa nativa
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }

  findAll() {
    //también lo puedes tipar indicando que recibes un string
    const apiKey = this.configService.get<string>('API_KEY');
    console.log(apiKey);
    const nameDataBase = this.config_.database.name;
    console.log(nameDataBase);
    return this.users;
  }

  findUser(id: number) {
    const user = this.users.find((element) => element.id === id);
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return user;
  }

  async getOrdersByUser(id: number) {
    const user = this.findUser(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
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
