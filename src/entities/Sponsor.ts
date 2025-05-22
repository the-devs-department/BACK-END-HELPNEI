import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SponsoredAccountRequest } from './SponsoredAccountRequest';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn()
  sponsorId: number;

  @Column()
  nameSponsor: string;

  @Column({ type: 'text', nullable: true })
  descriptionSponsor: string;

  @Column({ nullable: true })
  descriptionTitle: string;

  @Column({ nullable: true })
  exclusiveUrl: string;

  @Column({ type: 'text', nullable: true })
  facebook: string;

  @Column({ type: 'text', nullable: true })
  instagram: string;

  @Column({ type: 'text', nullable: true })
  linkedin: string;

  @Column({ type: 'text', nullable: true })
  tiktok: string;

  @Column({ type: 'text', nullable: true })
  x: string;

  @Column({ type: 'text', nullable: true })
  kawai: string;

  @Column({ type: 'text', nullable: true })
  whatsapp: string;

  @Column({ type: 'text', nullable: true })
  site_web: string;

  @Column({ type: 'text', nullable: true })
  urlSponsor: string;

  @Column({ type: 'text', nullable: true })
  highSponsorLogo: string;

  @Column({ type: 'text', nullable: true })
  lowSponsorLogo: string;

  @Column({ type: 'enum', enum: ['ate1', 'ate3', 'mais3'], nullable: false })
  rendaMinima: 'ate1' | 'ate3' | 'mais3';

  @OneToMany(() => SponsoredAccountRequest, (request) => request.sponsor)
  sponsoredRequests: SponsoredAccountRequest[];

  constructor(init?: Partial<Sponsor>) {
    Object.assign(this, init);
  }
}
