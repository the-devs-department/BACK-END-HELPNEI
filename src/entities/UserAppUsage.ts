import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity()
  export class UserAppUsage {
    @PrimaryColumn() userId: string;
    @PrimaryColumn({ type: 'timestamp' }) appUsageDate: Date;
  
    @Column({ type: 'int' }) appUsageTime: number;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    constructor(init?: Partial<UserAppUsage>) {
      Object.assign(this, init);
      this.appUsageDate = this.appUsageDate || new Date();
    }
  }
  