import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@app/common';
import { CreateOrderDto } from 'apps/orders/src/dto/Create-Order.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(ORDERS_SERVICE) private ordersClient: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() payload: CreateOrderDto) {
    return await this.ordersClient.send({ cmd: 'create_order' }, payload);
  }

  @Get()
  async findOrders() {
    return await this.ordersClient.send({ cmd: 'get_orders' }, {});
  }
}
