import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.model';
import { Product } from '../../../product/domain/models/product.model';

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false, name: 'order_id' })
  orderId: string;

  @Column('uuid', {name: 'product_id', nullable: false })
  productId: string;

  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn({ name: 'order_id' })
  @ManyToOne(() => Order, (order) => order.orderProducts, {eager: false})
  order: Order;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, )
  product: Product;
}
