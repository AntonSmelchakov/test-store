import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ){}


  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.productsRepository.find();
  }

  findById(idsArr: number[]) {
    return this.productsRepository.find({
      where: {id: In(idsArr)}
    });
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id: id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  updateBunch(patches: UpdateProductDto[]) {
    return this.productsRepository.save(patches);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
