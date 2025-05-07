import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Length, IsArray } from "class-validator";
import { UserRole } from "../enum/role.enum";
import { UserStatus } from "../enum/status.enum";

export class CreateUserDto {
  @ApiProperty({
    description: 'Họ tên người dùng',
    type: String,
  })
  @IsString()
  @Length(3, 30)
  fullname: string;

  @ApiProperty({
    description: 'Số điện thoại',
    type: String,
  })
  @IsString()
  @Length(10, 10)
  phone: string;

  @ApiProperty({
    description: 'Lớp học',
    type: String,
    required: false
  })
  @IsString()
  @IsOptional()
  class: string;

  @ApiProperty({
    description: 'MSSV',
    type: String,
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Mật khẩu',
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email (tuỳ chọn)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
