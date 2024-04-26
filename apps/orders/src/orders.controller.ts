import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/Create-Order.dto';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern({ cmd: 'create_order' }) // work with emit , not wait response from server
  createOrders(@Payload() payload: CreateOrderDto) {
    return this.ordersService.Create_Order(payload);
  }

  @MessagePattern({ cmd: 'get_orders' }) // work with send , wait the response back from the server
  findOrders(@Ctx() context: RmqContext) {
    console.log(context);
    console.log(context.getMessage());
    return this.ordersService.find_Order();
  }
}
