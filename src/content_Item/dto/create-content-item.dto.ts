import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TypeContent } from '../enum/type.enum';

export class CreateContentItemDto {
  @ApiProperty({ description: 'ID bài học', example: '665e8c3f1d4e4e1e9c3b7e2a' })
  @IsString()
  @IsNotEmpty()
  lid: string;

  @ApiProperty({ description: 'Loại nội dung', enum: TypeContent, example: TypeContent.HTML })
  @IsEnum(TypeContent)
  type: TypeContent;

  @ApiProperty({ description: 'Mô tả nội dung', example: 'Giới thiệu bài học' })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({ description: 'Dữ liệu nội dung', example: '<p>Hello world</p>' })
  @IsString()
  @IsNotEmpty()
  data: string;
}
