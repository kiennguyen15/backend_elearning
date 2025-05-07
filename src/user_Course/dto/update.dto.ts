import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class UpdateUserCourseDto {
  @ApiProperty({
    description: "uid",
    example: "665e8c3f1d4e4e1e9c3b7e2a",
    required: false,
  })
  @IsOptional()
  @IsString()
  uid?: string;

  @ApiProperty({
    description: "ID khóa học",
    example: "665e8c3f1d4e4e1e9c3b7e2a",
    required: false,
  })
  @IsString()
  @IsOptional()
  cid?: string;

  @ApiPropertyOptional({
    description: "Trạng thái hoạt động user khóa học",
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
