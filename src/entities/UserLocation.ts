import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Location } from './Location';

@Entity()
export class UserLocation {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  locationId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  constructor(init?: Partial<UserLocation>) {
    Object.assign(this, init);
  }
}