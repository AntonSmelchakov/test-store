import { IsEnum, IsArray, ArrayMinSize,ValidateNested, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatus } from '../entities/order.entity.js';
import { Type } from 'class-transformer';
import { ShopcartProductDto } from '../../products/dto/shopcart-product.dto.js';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  customer_contact: string;

  @IsString()
  @IsNotEmpty()
  delivery_address: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  total_amount?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ShopcartProductDto)
  products: ShopcartProductDto[];
}
