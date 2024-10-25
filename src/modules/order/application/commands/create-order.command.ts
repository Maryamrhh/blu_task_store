import { CreateOrderDto } from "../../presentation/dtos/create-order.dto";

export class CreateOrderCommand {
  constructor(public readonly createOrderDto: CreateOrderDto) {}
}
