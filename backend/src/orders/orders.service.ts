import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { Order } from './entities/order.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsService } from '../order-items/order-items.service.js';
import { CreateOrderItemDto } from '../order-items/dto/create-order-item.dto.js';
import { ProductsService } from '../products/products.service.js';
import { isNumber } from '@nestjs/common/internal';
import { ConflictException } from '@nestjs/common';

type CreateOrder = Omit<CreateOrderDto, 'products'>;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly orderItemsService: OrderItemsService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderFields: CreateOrder = {
      customer_name: createOrderDto.customer_name,
      customer_contact: createOrderDto.customer_contact,
      delivery_address: createOrderDto.delivery_address,
      total_amount: createOrderDto.total_amount,
    };
    const orderItems = createOrderDto.products;
    const products = await this.productsService.findById(
      orderItems.map((i) => i.id),
    );
    let actualTotalPrice = 0;
    for (const item of products) {
      const expectedQuantity = orderItems.find(
        (i) => i.id === item.id,
      )?.quantity;
      const unreservedProductsLeft = item.stock - item.reserved;
      if (!isNumber(expectedQuantity))
        throw new ConflictException('Некорректно передалось кол-во товаров');
      if (expectedQuantity > unreservedProductsLeft)
        throw new ConflictException(
          `Количество доступных товров изменилось (${expectedQuantity} / ${unreservedProductsLeft}) попробуйте ещё раз`,
        );
      actualTotalPrice += item.price * expectedQuantity;
    }
    orderFields.total_amount = actualTotalPrice;
    const order = this.orderRepository.create(createOrderDto);
    const savedOrder = await this.orderRepository.save(order);
    const result = [];
    const productsPatch = [];
    for (const item of products) {
      const expectedQuantity = orderItems.find(
        (i) => i.id === item.id,
      )?.quantity;
      if (!isNumber(expectedQuantity))
        throw new ConflictException('Некорректно передалось кол-во товаров');
      const orderItem = {
        order_id: savedOrder.id,
        product_id: item.id,
        quantity: expectedQuantity,
        price_at_purchase: item.price,
      };
      const patchItem = {
        id: item.id,
        reserved: item.reserved + expectedQuantity,
      };
      result.push(orderItem);
      productsPatch.push(patchItem);
    }
    // throw new ConflictException(result);
    this.orderItemsService.create(result);
    this.productsService.updateBunch(productsPatch);
    return savedOrder;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id: id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
