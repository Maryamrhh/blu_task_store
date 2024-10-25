import { Module } from '@nestjs/common';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './domain/models/order-product.entity';
import { Order } from './domain/models/order.model';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
  controllers: [OrderController],
  providers: [
    OrderService,
  ],
})
export class OrderModule {}
