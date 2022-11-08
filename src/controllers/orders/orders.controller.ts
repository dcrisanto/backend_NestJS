import { Controller, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('users/:id')
  getOrder(@Param('id') id: number) {
    return `retornando las ordenes del usuario con el id ${id}`;
  }
}
