import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripCreat } from './dtos/trip-creat.dto';
@Controller('api/trip')
export class TripsController {
  constructor(private readonly tripService: TripsService) {}
  @Get(':id')
  public getTrip(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.getByOne(id);
  }
  @Post()
  public creatTrip(@Body() body: TripCreat) {
    return this.tripService.creat(body);
  }
  @Put(':id/accept')
  public acceptTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.accept(id, body);
  }
  @Put(':id/reject')
  public rejectedTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.reject(id, body);
  }
  @Put(':id/arriv')
  public arrivedTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.arrive(id, body);
  }
  @Put(':id/cancel')
  public cancelTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.cancel(id, body);
  }
  @Put(':id/start')
  public startedTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.start(id, body);
  }
  @Put(':id/end')
  public endedTrip(
    @Param('id', ParseIntPipe) id: number,
    @Body('bode', ParseIntPipe) body: number,
  ) {
    return this.tripService.end(id, body);
  }
}
