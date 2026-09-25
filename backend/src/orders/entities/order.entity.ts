import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum OrderStatus {
    CREATED = "created",
    PAID = "paid",
    SENT = "sent",
    DELIVERED = "delivered",
    CANCELED = "canceled"
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  customer_contact: string;

  @Column()
  delivery_address: string;

  @Column({ default: 0 })
  total_amount: number

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED,})
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
