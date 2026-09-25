import { IsArray, ValidateNested, ArrayMinSize, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ShopcartProductDto } from './shopcart-product.dto.js';

export class CartRefreshDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ShopcartProductDto)
  products: ShopcartProductDto[];
}
