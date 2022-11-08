import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return {
      message: 'retornando los clientes',
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create customer',
      payload,
    };
  }
}
