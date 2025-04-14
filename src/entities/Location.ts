import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column({ nullable: true }) bairro: string;
  @Column({ nullable: true }) cep: string;
  @Column({ nullable: true }) cidade: string;
  @Column({ nullable: true }) condominio: string;
  @Column({ nullable: true, type: 'text' }) endereco: string;
  @Column({ nullable: true }) estado: string;
  @Column({ nullable: true }) geoPoint: string;
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true }) latitude: number;
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true }) longitude: number;
  @Column({ nullable: true }) placeId: string;
  @Column({ nullable: true }) tipoLocal: string;

  constructor(init?: Partial<Location>) {
    Object.assign(this, init);
  }
}