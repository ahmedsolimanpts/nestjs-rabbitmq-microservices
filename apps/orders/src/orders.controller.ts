import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/Create-Order.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  createOrders(@Payload() payload: CreateOrderDto) {
    return this.ordersService.Create_Order(payload);
  }

  @EventPattern({ cmd: 'get_orders' })
  findOrders() {
    return this.ordersService.find_Order();
  }
}
