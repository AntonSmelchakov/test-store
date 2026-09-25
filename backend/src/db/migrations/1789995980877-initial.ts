import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';

const initialItems = [
    {
      name: "Товар 1",
      description: "Тестовый товар для тестов из теста",
      price: 1000,
      image_url: '/image/1.jpg',
      stock: 32,
      reserved: 0,
  },
  {
    name: "Товар 2",
    description: "Тестовый товар для тестов из теста",
    price: 200,
    image_url: '/image/2.jpg',
    stock: 2,
    reserved: 0,
  },
  {
    name: "Товар 3",
    description: "Тестовый товар для тестов из теста",
    price: 3000,
    image_url: '/image/3.jpg',
    stock: 3,
    reserved: 0,
  },
  {
    name: "Товар 4",
    description: "Тестовый товар для тестов из теста",
    price: 4000,
    image_url: '/image/4.jpg',
    stock: 4,
    reserved: 0,
  },
  {
    name: "Товар 5",
    description: "Тестовый товар для тестов из теста",
    price: 5000,
    image_url: '/image/5.jpg',
    stock: 5,
    reserved: 0,
  },
  {
    name: "Товар 6",
    description: "Тестовый товар для тестов из теста",
    price: 6000,
    image_url: '/image/6.jpg',
    stock: 6,
    reserved: 0,
  },
  {
    name: "Товар 7",
    description: "Тестовый товар для тестов из теста",
    price: 7000,
    image_url: '/image/7.jpg',
    stock: 7,
  },
  {
    name: "Товар 8",
    description: "Тестовый товар для тестов из теста",
    price: 8000,
    image_url: '/image/8.jpg',
    stock: 8,
    reserved: 0,
  },
  {
    name: "Товар 9",
    description: "Тестовый товар для тестов из теста",
    price: 9000,
    image_url: '/image/9.jpg',
    stock: 9,
    reserved: 0,
  },
]


export class Initial1789995980877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepo = queryRunner.manager.getRepository(Product);
    await productRepo.save(initialItems.map((item) => productRepo.create(item)));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(Product)
          .where('name IN (:...names)', { names: initialItems.map((item) => item.name) })
          .execute();
  }
}
