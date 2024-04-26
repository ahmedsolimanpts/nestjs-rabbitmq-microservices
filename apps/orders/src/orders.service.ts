import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './Schema/Order.Schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/Create-Order.dto';

@Injectable()
export class OrdersService {
  protected readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name) private readonly orederModel: Model<Order>,
  ) {}

  async Create_Order(ceateOrderDto: CreateOrderDto) {
    try {
      const newOrder = new this.orederModel(ceateOrderDto);
      return await newOrder.save();
    } catch (err) {
      throw err;
    }
  }

  async find_Order() {
    try {
      return await this.orederModel.find();
    } catch (err) {
      throw err;
    }
  }
}
