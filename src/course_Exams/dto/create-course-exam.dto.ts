import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsDateString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeExam } from '../enum/type.enum';

export class CreateCourseExamDto {
  @ApiProperty({
    example: '605c72ef153207001f5e4f6',
    description: 'ID của khóa học (Course) mà kỳ thi này thuộc về',
  })
  @IsMongoId()
  @IsNotEmpty()
  cid: string;

  @ApiProperty({
    example: 'Kỳ thi cuối kỳ môn Lập trình Web',
    description: 'Tiêu đề kỳ thi',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 30,
    description: 'Tỉ lệ đậu',
  })
  @IsNumber()
  percentAnswer: number

  @ApiProperty({
    example: true,
    description: 'Chấm bài theo',
    type: Boolean
  })
  @IsBoolean()
  direct: boolean;

  @ApiProperty({
    example: TypeExam.CERTIFICATION_EXAM,
    description: 'Loại kỳ thi, có thể là chứng chỉ, cuối kỳ...',
    enum: TypeExam,
  })
  @IsEnum(TypeExam)
  @IsNotEmpty()
  type: TypeExam;

  @ApiProperty({
    example: '2025-05-01T00:00:00Z',
    description: 'Thời gian kỳ thi sẽ bắt đầu có sẵn (ISO 8601 format)',
  })
  @IsDateString()
  @IsNotEmpty()
  availableFrom: string; // Thời gian bắt đầu

  @ApiProperty({
    example: '2025-05-10T23:59:59Z',
    description: 'Thời gian kỳ thi kết thúc, không còn sẵn (ISO 8601 format)',
  })
  @IsDateString()
  @IsNotEmpty()
  availableTo: string; // Thời gian kết thúc
}
