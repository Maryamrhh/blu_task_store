// src/product/application/queries/get-all-products.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductService } from '../../services/product.service';
import { GetProductsQuery } from '../get-products.query';

@QueryHandler(GetProductsQuery)
export class GetAllProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductsQuery) {
    return this.productService.getProducts(query.page, query.limit);
  }
}
