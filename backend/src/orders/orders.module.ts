import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItemsModule } from '../order-items/order-items.module.js';
import { ProductsModule } from '../products/products.module.js';


@Module({
  imports: [TypeOrmModule.forFeature([Order]),OrderItemsModule,ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
