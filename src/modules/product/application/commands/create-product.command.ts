import { ProductCategory } from "../../domain/models/product.model";

export class CreateProductCommand {
    constructor(
      public readonly name: string,
      public readonly price: number,
      public readonly quantity: number,
      public readonly category: ProductCategory,
      public readonly description?: string,
      public readonly imageUrl?: string,
    ) {}
  }
  