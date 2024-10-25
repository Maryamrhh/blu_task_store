import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  export enum HistoryAction {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    DELETED = 'DELETED',
  }

  export enum HistoryEntityType {
    PRODUCT = 'PRODUCT',
    ORDER = 'ORDER',
    User = 'User',
    ORDER_PRODUCT = 'ORDER_PRODUCT',
  }
  @Entity('history')
  export class History {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    entityId: string; // The ID of the entity (e.g., Product ID or Order ID)
  
    @Column()
    entityType: HistoryEntityType; // The type of the entity (e.g., "Product", "Order")
  
    @Column('text')
    action: HistoryAction; // Action performed (e.g., "CREATED", "UPDATED", "DELETED")
  
    @Column('json', { nullable: true })
    previousState: any; // The state of the entity before the action (if applicable)
  
    @Column('json', { nullable: true })
    newState: any; // The state of the entity after the action
  
    @CreateDateColumn()
    createdAt: Date; // Timestamp of when the change occurred
  }
  