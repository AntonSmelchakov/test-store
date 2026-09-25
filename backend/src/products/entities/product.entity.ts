import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  reserved: number;

  @CreateDateColumn()
  created_at: Date;
}
