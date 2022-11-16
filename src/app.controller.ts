import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint() {
    return 'Yo soy nueva en nest';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
