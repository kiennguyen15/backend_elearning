import { IsArray, IsMongoId, IsOptional, IsNumber, IsString, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusExam } from '../enum/status.enum';

export class CreateExamResultDto {
  @ApiProperty({ example: '6819ce5480cfbd585d32b9f4', description: 'ID bài thi' })
  @IsMongoId()
  ceid: string;
}
