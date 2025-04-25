import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Unique,
  } from 'typeorm';
  import { User } from './User';
  import { Sponsor } from './Sponsor';
  
  @Entity()
  export class SponsoredAccountRequest {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Sponsor, (sponsor) => sponsor.sponsoredRequests)
    @JoinColumn({ name: 'sponsorId' })
    sponsor: Sponsor;
  
    @Column({ default: false })
    approved: boolean;
  
    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    approvedAt: Date;
  
    constructor(user: User, sponsor: Sponsor, approved?: boolean) {
      this.user = user;
      this.sponsor = sponsor;
      this.approved = approved ?? Math.random() < 0.5;
      this.createdAt = new Date();
      this.approvedAt = new Date();
    }
  }  