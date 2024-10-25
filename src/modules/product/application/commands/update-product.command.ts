import { ProductCategory } from "../../domain/models/product.model";

export class UpdateProductCommand {
    constructor(
      public readonly id: string,
      public readonly name?: string,
      public readonly price?: number,
      public readonly quantity?: number,
      public readonly category?: ProductCategory,
      public readonly description?: string,
      public readonly imageUrl?: string,
    ) {}
  }
  