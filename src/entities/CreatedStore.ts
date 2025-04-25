import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity()
  export class CreatedStore {
    @PrimaryGeneratedColumn('uuid')
    storeId: string;
  
    @Column() storeOwnerId: string;
  
    @Column({ default: true }) isActive: boolean;
    @Column({ nullable: true }) storeCategory: string;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'storeOwnerId' })
    storeOwner: User;
  
    constructor(init?: Partial<CreatedStore>) {
      Object.assign(this, init);
    }
  }