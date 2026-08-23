import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from './userrole';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  fname: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  lname: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsEnum(UserRole)
  userRole: UserRole;
}
