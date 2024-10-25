// src/product/application/commands/create-product.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../services/product.service';
import { CreateProductCommand } from '../create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productService: ProductService) {}

  async execute(command: CreateProductCommand) {
    return this.productService.createProduct(command);
  }
}
