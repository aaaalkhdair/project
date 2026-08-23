import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips.entity';
@Module({
  controllers: [TripsController],
  providers: [TripsService],
  imports: [TypeOrmModule.forFeature([Trip])],
})
export class TripsModule {}
