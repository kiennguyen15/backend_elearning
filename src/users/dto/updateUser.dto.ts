import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Length, IsArray } from "class-validator";
import { UserRole } from "../enum/role.enum";
import { UserStatus } from "../enum/status.enum";

export class UpdateUserDto {
  @ApiProperty({
    description: 'Họ tên người dùng',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  fullname?: string;

  @ApiProperty({
    description: 'Email (tuỳ chọn)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

}
