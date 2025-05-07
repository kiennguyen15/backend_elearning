import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, ArrayNotEmpty } from "class-validator";

export class CreateUserCourseDto {
  @ApiProperty({
    description: 'Danh sách ID người dùng',
    example: ['665e8c3f1d4e4e1e9c3b7e2a'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  uid: string[];

  @ApiProperty({
    description: 'ID khóa học',
    example: '665e8c3f1d4e4e1e9c3b7e2a',
  })
  @IsString()
  @IsNotEmpty()
  cid: string;
}
