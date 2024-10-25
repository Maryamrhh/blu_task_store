// src/product/application/commands/update-product.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../services/product.service';
import { UpdateProductCommand } from '../update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly productService: ProductService) {}

  async execute(command: UpdateProductCommand) {
    return this.productService.updateProduct(command);
  }
}
