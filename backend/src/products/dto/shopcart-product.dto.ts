import { IsString, IsNumber, Min } from 'class-validator';

export class ShopcartProductDto {
  @IsNumber()
  @Min(0)
  id: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
