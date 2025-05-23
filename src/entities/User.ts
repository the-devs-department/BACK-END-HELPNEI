import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Sponsor } from './Sponsor';
  import { Location } from './Location';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @Column({default: 'ate1'})
    renda: string;
  
    @Column() nome: string;
    @Column({ nullable: true }) nomeExibicao: string;
    @Column({ type: 'bigint', nullable: true }) dataNascimento: number;
    @Column({ nullable: true }) indicadoPor: string;
  
    @ManyToOne(() => Location, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'localId' })
    location: Location;
  
    @ManyToOne(() => Sponsor, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'sponsorId' })
    sponsor: Sponsor;
  
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
  }
  