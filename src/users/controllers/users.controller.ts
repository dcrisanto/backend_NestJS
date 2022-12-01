import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findUser(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.userService.getOrdersByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }

  @Get(':id/tasks')
  getTasks(@Param('id', MongoIdPipe) id: string) {
    return this.userService.getTasks(id);
  }
}
