import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service.js';
import { OrderItemsController } from './order-items.controller.js';
import { OrderItem } from './entities/order-item.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],

})
export class OrderItemsModule {}
