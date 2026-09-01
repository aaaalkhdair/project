import { Repository } from 'typeorm';
import { User } from './users.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dtos/user-creat.dto';
import { UserUpdate } from './dtos/user-apdate.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  public async getAll() {
    return await this.userRepository.find();
  }
  public async creat(body: UserCreateDto) {
    const { fname, lname, phone, userRole } = body;
    const userDB = await this.userRepository.findOne({ where: { phone } });
    if (userDB) {
      throw new BadRequestException('user is found');
    }
    let newUser = this.userRepository.create({
      fname,
      lname,
      phone,
      userRole,
    });
    newUser = await this.userRepository.save(newUser);
    const payload = { id: newUser.id, userRole: newUser.userRole };
    const token = await this.jwtService.sign(payload);
    return { user: newUser, token };
  }
  public async getByOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Not Found User');
    return user;
  }
  public async updut(id: number, body: UserUpdate) {
    const user = await this.getByOne(id);
    user.fname = body.fname ?? user.fname;
    user.lname = body.lname ?? user.lname;
    user.phone = body.phone ?? user.phone;
    return this.userRepository.save(user);
  }
  public async delete(id: number) {
    const user = await this.getByOne(id);
    await this.userRepository.remove(user);
    return { message: 'sccesflly ' };
  }
}
