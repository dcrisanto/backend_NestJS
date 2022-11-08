import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return {
      message: 'retornando la lista de usuarios existentes',
    };
  }

  @Get(':id')
  getUserId(@Param('id') id: number) {
    return {
      message: `El id del usuario es ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create user',
      payload,
    };
  }
}
