import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { CartRefreshDto } from './dto/cartrefresh.dto.js';
import { Product } from './entities/product.entity.js';
import { isNumber } from '@nestjs/common/internal';

interface CartRefreshProduct extends Product {
  noStock?: boolean;
  actualQuantity?: number;
}

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async findById(@Body() dto: CartRefreshDto) {
    const ids = dto.products.map(item => item.id);
    const products = await this.productsService.findById(ids);
    const result = [];
    for (const item of products) {
      const expectedQuantity = dto.products.find((i) => i.id === item.id)?.quantity;
      const newItem: CartRefreshProduct = { ...item };
      const unreservedProductsLeft = item.stock - item.reserved;
      if (unreservedProductsLeft <= 0) newItem.noStock = true;
      if (isNumber(expectedQuantity) && unreservedProductsLeft < expectedQuantity) newItem.actualQuantity = unreservedProductsLeft;
      result.push(newItem);
    }
    return this.productsService.findById(ids);
  }

  @Post('add')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
