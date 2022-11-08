import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('users/:id')
  getOrder(@Param('id') id: number) {
    return {
      message: `retornando las ordenes del usuario con el id ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create order',
      payload,
    };
  }
}
