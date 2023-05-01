import { BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
