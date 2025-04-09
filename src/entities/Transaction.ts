import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './User';
  import { CreatedStore } from './CreatedStore';
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn()
    transactionId: number;
  
    @Column() userId: string;
    @Column() storeId: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 }) amount: number;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) transactionDate: Date;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => CreatedStore, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'storeId' })
    store: CreatedStore;
  
    constructor(init?: Partial<Transaction>) {
      Object.assign(this, init);
    }
}