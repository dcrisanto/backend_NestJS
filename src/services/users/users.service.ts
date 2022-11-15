import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
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
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((element) => element.id === id);
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`);
    }
    return user;
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
    const user = this.findOne(id);
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
