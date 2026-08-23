import { IsOptional } from 'class-validator';

export class UserUpdate {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  @IsOptional()
  fname: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  @IsOptional()
  lname: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone: string;
}
