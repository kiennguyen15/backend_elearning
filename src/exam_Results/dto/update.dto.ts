import { IsArray, IsMongoId, IsOptional, IsNumber, IsString, IsEnum, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusExam } from '../enum/status.enum';

class AnswerDto {
  @ApiProperty({ example: '6819c93469e63f2d19bd45ca', description: 'ID câu hỏi' })
  @IsMongoId()
  questionId: string;

  @ApiPropertyOptional({ example: 'A', description: 'Lựa chọn của người dùng' })
  @IsString()
  @IsOptional()
  selectedOption?: string;

  @ApiPropertyOptional({ example: 'Nguyễn Du', description: 'Câu trả lời tự luận' })
  @IsString()
  @IsOptional()
  writtenAnswer?: string;

  @ApiPropertyOptional({ example: true, description: 'Câu trả lời có đúng không' })
  @IsOptional()
  isCorrect?: boolean;
}

export class UpdateExamResultDto {
  @ApiProperty({ example: '665c3a1e1a4f2c001e6d12b3', description: 'ID người dùng' })
  @IsMongoId()
  uid: string;

  @ApiProperty({ example: '6819ce5480cfbd585d32b9f4', description: 'ID bài thi' })
  @IsMongoId()
  ceid: string;

  @ApiProperty({ example: 85, description: 'Điểm số bài thi' })
  @IsNumber()
  score: number;

  @ApiPropertyOptional({ example: '2025-05-01T08:00:00.000Z', description: 'Thời gian nộp bài' })
  @IsDate()
  @IsOptional()
  submittedAt?: Date;

  @ApiPropertyOptional({ example: 1800, description: 'Thời gian làm bài tính bằng giây' })
  @IsNumber()
  @IsOptional()
  durationSeconds?: number;

  @ApiProperty({
    example: StatusExam.IN_PROGRESS,
    description: 'Trạng thái bài thi',
    enum: StatusExam,
  })
  @IsEnum(StatusExam)
  status: StatusExam;

  @ApiProperty({
    type: [AnswerDto],
    description: 'Danh sách các câu hỏi và đáp án của bài thi',
  })
  @IsArray()
  @IsOptional()
  answers?: AnswerDto[];
}
