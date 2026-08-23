import { IsNotEmpty, IsNumber } from 'class-validator';

export class TripCreat {
  @IsNotEmpty()
  @IsNumber()
  riderId: number;
}
