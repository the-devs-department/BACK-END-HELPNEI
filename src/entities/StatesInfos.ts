import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Sponsor } from './Sponsor';

@Entity()
export class StatesInfos{
  @PrimaryColumn()
  sponsorId: number;

  @Column({type: 'int', nullable: false})
  SP: number;
  @Column({type: 'int', nullable: false})
  MG: number;
  @Column({type: 'int', nullable: false})
  RJ: number;
  @Column({type: 'int', nullable: false})
  BA: number;
  @Column({type: 'int', nullable: false})
  RS: number;
  @Column({type: 'int', nullable: false})
  PR: number;
  @Column({type: 'int', nullable: false})
  PE: number;
  @Column({type: 'int', nullable: false})
  CE: number;
  @Column({type: 'int', nullable: false})
  PA: number;
  @Column({type: 'int', nullable: false})
  MA: number;
  @Column({type: 'int', nullable: false})
  GO: number;
  @Column({type: 'int', nullable: false})
  DF: number;
  @Column({type: 'int', nullable: false})
  SC: number;
  @Column({type: 'int', nullable: false})
  PB: number;
  @Column({type: 'int', nullable: false})
  ES: number;
  @Column({type: 'int', nullable: false})
  AM: number;
  @Column({type: 'int', nullable: false})
  RN: number;
  @Column({type: 'int', nullable: false})
  MT: number;
  @Column({type: 'int', nullable: false})
  AL: number;
  @Column({type: 'int', nullable: false})
  PI: number;
  @Column({type: 'int', nullable: false})
  MS: number;
  @Column({type: 'int', nullable: false})
  SE: number;
  @Column({type: 'int', nullable: false})
  TO: number;
  @Column({type: 'int', nullable: false})
  RO: number;
  @Column({type: 'int', nullable: false})
  AC: number;
  @Column({type: 'int', nullable: false})
  AP: number;
  @Column({type: 'int', nullable: false})
  RR: number;

  @JoinColumn({name: 'sponsorId'})
  sponsor: Sponsor;

  constructor(init?: Partial<StatesInfos>) {
    Object.assign(this, init);
  }
}