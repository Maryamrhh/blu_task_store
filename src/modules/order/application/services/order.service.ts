import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateOrderDto } from '../../presentation/dtos/create-order.dto';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { OrderProduct } from '../../domain/models/order-product.entity';
import { Product } from '../../../product/domain/models/product.model';
import { User } from '../../../auth/domain/models/user.model';
import { History, HistoryAction, HistoryEntityType } from '../../../../history/history.model';

@Injectable()
export class OrderService {
  constructor(private readonly entityManager: EntityManager) {}

  async createOrder(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.entityManager.transaction(async (eM) => {
      let totalPrice = 0;
      const orderProducts = [];

      for (const productOrder of createOrderDto.products) {
        const product = await eM.findOne(Product, {
          where: { id: productOrder.productId },
        });
        if (!product) {
          throw new BadRequestException(
            `Product with ID ${productOrder.productId} not found`,
          );
        }

        if (productOrder.quantity > product.quantity) {
          throw new BadRequestException(
            `Product with ID ${productOrder.productId} is out of stock`,
          );
        }

        product.quantity -= productOrder.quantity;
        await eM.save(product);

        const linePrice = product.price * productOrder.quantity;
        totalPrice += linePrice;

        orderProducts.push({
          productId: productOrder.productId,
          quantity: productOrder.quantity,
        });
      }

      const order = await eM.save(Order, {
        userId: user.id,
        totalPrice,
        status: OrderStatus.COMPLETED,
      });

      await eM.save(History, {
        entityId: order.id,
        entityType: HistoryEntityType.ORDER,
        action: HistoryAction.CREATED,
      });
      
      for (const productOrder of orderProducts) {
        const orderProduct = eM.create(OrderProduct, {
          orderId: order.id,
          productId: productOrder.productId,
          quantity: productOrder.quantity,
        });
        const savedOrderProduct = await eM.save(orderProduct);
        await eM.save(History, {
            entityId: savedOrderProduct.id,
            entityType: HistoryEntityType.ORDER_PRODUCT,
            action: HistoryAction.CREATED,
          });
      }

      return order
    });
  }
}
