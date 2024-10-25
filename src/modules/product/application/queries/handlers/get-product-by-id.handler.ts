// src/product/application/queries/get-product-by-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductService } from '../../services/product.service';
import { GetProductQuery } from '../get-product.query';

@QueryHandler(GetProductQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductQuery) {
    return this.productService.getProductById(query.id);
  }
}
