import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCommand } from '../commands/create-product.command';
import { UpdateProductCommand } from '../commands/update-product.command';
import { EntityManager } from 'typeorm';
import { Product } from '../../domain/models/product.model';
import { History, HistoryAction, HistoryEntityType } from '../../../../history/history.model';


@Injectable()
export class ProductService {
  constructor(private readonly entityManager: EntityManager) {}

  async createProduct(command: CreateProductCommand) {
    return this.entityManager.transaction(async (eM) => {
      const product = eM.create(Product, command);
      const newProduct = await eM.save(product);
      await eM.save(History, {
        entityId: newProduct.id,
        entityType: HistoryEntityType.PRODUCT,
        action: HistoryAction.CREATED,
      });
      return newProduct;
    });
  }

  async updateProduct(command: UpdateProductCommand) {
    return this.entityManager.transaction(async (eM) => {
      const product = await eM.findOne(Product, { where: { id: command.id } });
      if (!product) throw new NotFoundException('Product not found');

      Object.assign(product, command);
      await eM.save(History, {
        entityId: product.id,
        entityType: HistoryEntityType.PRODUCT,
        action: HistoryAction.UPDATED,
      });
      return eM.save(product);
    });
  }

  async getProductById(id: string) {
    return this.entityManager.transaction(async (eM) => {
      const product = await eM.findOne(Product, { where: { id } });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    });
  }

  async getProducts(page: number, limit: number) {
    return this.entityManager.transaction(async (eM) => {
      return {
        data: await eM.find(Product, { skip: (page - 1) * limit, take: limit }),
        page,
        limit,
        total: await eM.count(Product),
      };
    });
  }

  async deleteProduct(id: string): Promise<void> {
    return this.entityManager.transaction(async (eM) => {
      const product = await eM.findOne(Product, { where: { id } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      product.active = false; // Mark as inactive for soft delete
      await eM.update(Product, id, product); // Save changes
      await eM.softRemove(product);
      await eM.save(History, {
        entityId: product.id,
        entityType: HistoryEntityType.PRODUCT,
        action: HistoryAction.DELETED,
      });
    });
  }
}
