// src/product/application/commands/delete-product.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../services/product.service';
import { DeleteProductCommand } from '../delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly productService: ProductService) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.productService.deleteProduct(command.id);
  }
}
