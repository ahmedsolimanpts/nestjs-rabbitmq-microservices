import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { Order, OrderSchema } from './Schema/Order.Schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        MONGO_CLUSTER: joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CLUSTER'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
