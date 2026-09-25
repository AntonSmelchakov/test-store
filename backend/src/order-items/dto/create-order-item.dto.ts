import { IsInt, IsPositive, IsOptional, Min, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  order_id: number;

  @IsInt()
  @IsPositive()
  product_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number = 1;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price_at_purchase?: number;
}
