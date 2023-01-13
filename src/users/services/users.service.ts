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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    //@Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
    @Inject(config.KEY) private config_: ConfigType<typeof config>,
    @Inject('PG') private clientPG: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

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
    return this.userRepo.find();
  }

  async findUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return user;
  }

  async getOrdersByUser(id: number) {
    const user = await this.findUser(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findUser(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.findUser(id);
    this.userRepo.delete(id);
    return `El usuario con el id ${id} fue eliminado satisfactoriamente`;
  }
}
