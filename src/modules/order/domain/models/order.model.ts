import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { OrderProduct } from './order-product.entity';
import { User } from '../../../auth/domain/models/user.model';


export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { name: 'total_price', precision: 100, scale: 2 })
  totalPrice: number;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;

  @Column('varchar', { default: OrderStatus.COMPLETED }) 
  status: OrderStatus;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;
}
