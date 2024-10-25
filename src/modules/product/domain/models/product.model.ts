import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum ProductCategory {
  C1 = 'c1',
  C2 = 'c2',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('decimal', { precision: 100, scale: 2, nullable: false })
  price: number;

  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

  @Column('varchar', { name: 'category', nullable: false })
  category: ProductCategory;

  @Column('text', { name: 'description', nullable: true })
  description?: string;

  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column('boolean', { default: true })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
