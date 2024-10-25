import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { JwtAuthGuard } from '../../../../shared/guards/auth.guard';
import { AuthUser } from '../../../../shared/decorators/user.decorator';
import { User, UserRole } from '../../../auth/domain/models/user.model';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createOrder(
    @AuthUser() user: User,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    if (user.role !== UserRole.USER) throw new UnauthorizedException('Invalid credentials');

    return this.orderService.createOrder(user, createOrderDto);
  }
}
