import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return `retornando la lista de usuarios existentes`;
  }

  @Get(':id')
  getUserId(@Param('id') id: number) {
    return `El id del usuario es ${id}`;
  }
}
