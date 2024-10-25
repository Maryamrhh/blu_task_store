import { OrderProduct } from '../../domain/models/order-product.entity';

export class OrderResponseDto {
  id: string;
  totalPrice: number;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products: OrderProduct[];
}
