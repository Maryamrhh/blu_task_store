import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/models/product.model';
import { GetAllProductsHandler } from './application/queries/handlers/get-all-products.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductByIdHandler } from './application/queries/handlers/get-product-by-id.handler';
import { CreateProductHandler } from './application/commands/handlers/create-product.handler';
import { UpdateProductHandler } from './application/commands/handlers/update-product.handler';
import { DeleteProductHandler } from './application/commands/handlers/delete-product.handler';
import { History } from '../../history/history.model';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product, History]), // Imports the Product entity for database interaction
  ],
  controllers: [ProductController], // Registers the ProductController
  providers: [
    ProductService,
    GetAllProductsHandler,
    GetProductByIdHandler,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler // Service handling the business logic
  ],
  exports: [ProductService], // Exports ProductService if other modules need it
})
export class ProductModule {}
