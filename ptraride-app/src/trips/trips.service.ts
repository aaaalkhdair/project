import { Repository } from 'typeorm';
import { Trip } from './trips.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripCreat } from './dtos/trip-creat.dto';
import { TripStatus } from './tripstatus';
import { UserRole } from '../users/dtos/userrole';
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly userRepository: Repository<Trip>,
  ) {}
  public async creat(body: TripCreat) {
    const newTrip = this.userRepository.create({
      rider: { id: body.riderId },
    });
    return await this.userRepository.save(newTrip);
  }
  public async getByOne(id: number) {
    const trip = await this.userRepository.findOne({ where: { id } });
    if (!trip) throw new NotFoundException('Not Found Trip');
    return trip;
  }
  public async accept(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.CREATED
    ) {
      throw new BadRequestException('');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    trip.driver = { id: driverId } as any;
    trip.tripstatus = TripStatus.ACCEPTED;
    return this.userRepository.save(trip);
  }
  public async reject(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.CREATED
    ) {
      throw new BadRequestException('');
    }
    trip.driver = { id: driverId };
    trip.tripstatus = TripStatus.REJECTED;
    return this.userRepository.save(trip);
  }
  public async arrive(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.ACCEPTED
    ) {
      throw new BadRequestException('');
    }
    trip.driver = { id: driverId };
    trip.tripstatus = TripStatus.ARRIVED;
    return this.userRepository.save(trip);
  }
  public async cancel(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.CREATED
    ) {
      throw new BadRequestException('');
    }
    trip.driver = { id: driverId };
    trip.tripstatus = TripStatus.CANCELED;
    return this.userRepository.save(trip);
  }
  public async start(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.ARRIVED
    ) {
      throw new BadRequestException('');
    }
    trip.driver = { id: driverId };
    trip.tripstatus = TripStatus.STARTED;
    return this.userRepository.save(trip);
  }
  public async end(tripId: number, driverId: number) {
    const trip = await this.getByOne(tripId);
    if (
      !UserRole.ADMIN &&
      !UserRole.DRIVER &&
      trip.tripstatus !== TripStatus.STARTED
    ) {
      throw new BadRequestException('');
    }
    trip.driver = { id: driverId };
    trip.tripstatus = TripStatus.ENDED;
    return this.userRepository.save(trip);
  }
}
