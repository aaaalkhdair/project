import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { TripStatus } from './tripstatus';

@Entity({ name: 'trip' })
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.CREATED,
  })
  tripstatus: TripStatus;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creatAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;
  @ManyToOne(() => User, (user) => user.riderTrip)
  rider: User;
  @ManyToOne(() => User, (user) => user.driverTrip)
  driver: User;
}
