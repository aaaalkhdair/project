import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-creat.dto';
import { UserUpdate } from './dtos/user-apdate.dto';
@Controller('api/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  public getAllUser() {
    return this.userService.getAll();
  }
  @Post()
  public creatUser(@Body() body: UserCreateDto) {
    return this.userService.creat(body);
  }
  @Get(':id')
  public getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getByOne(id);
  }
  @Put(':id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdate,
  ) {
    return this.userService.updut(id, body);
  }
  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
