import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './dtos/userrole';
import { Trip } from '../trips/trips.entity';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fname: string;
  @Column()
  lname: string;
  @Column()
  phone: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.RIDER,
  })
  userRole: UserRole;
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
  @OneToMany(() => Trip, (trip) => trip.rider)
  riderTrip: Trip[];
  @OneToMany(() => Trip, (trip) => trip.driver, { nullable: true })
  driverTrip: Trip[];
}
