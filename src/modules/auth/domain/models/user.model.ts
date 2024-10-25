import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', { name: 'email', unique: true, nullable: false })
  email: string;

  @Column('varchar', { name: 'password', nullable: false })
  password: string;

  @Column('timestamp', { default:  '"NOW()"' })
  createdAt: Date;

  @Column('timestamp', {
    default: '"NOW()"',
    onUpdate: '"NOW()"',
  })
  updatedAt: Date;

  @Column('boolean', { default: true })
  active: boolean;

  @Column('varchar', { name: 'role', nullable: false })
  role: UserRole; 
}
