import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { TypeQuestion } from '../enum/type.enum';
  
  class QuizOptionDto {
    @ApiPropertyOptional({ example: 'A', description: 'Nhãn hiển thị cho option' })
    @IsOptional()
    @IsString()
    label?: string;
  
    @ApiPropertyOptional({ example: 'Đáp án A', description: 'Nội dung của option' })
    @IsOptional()
    @IsString()
    value?: string;
  
    @ApiPropertyOptional({ example: true, description: 'Đáp án này có đúng không' })
    @IsOptional()
    isCorrect?: boolean;
  }
  
  export class UpdateQuizDto {
    @ApiPropertyOptional({ example: '665c3a1e1a4f2c001e6d12b3', description: 'ID của bài học (Lesson)' })
    @IsOptional()
    @IsMongoId()
    lid?: string;
  
    @ApiPropertyOptional({ example: 'Ai là người viết Truyện Kiều?', description: 'Câu hỏi cần trả lời' })
    @IsOptional()
    @IsString()
    questionText?: string;
  
    @ApiPropertyOptional({
      example: TypeQuestion.MULTIPLE_CHOICE,
      description: 'Loại câu hỏi',
      enum: TypeQuestion,
    })
    @IsOptional()
    @IsEnum(TypeQuestion)
    type?: TypeQuestion;
  
    @ApiPropertyOptional({
      type: [QuizOptionDto],
      description: 'Danh sách các lựa chọn (chỉ dùng cho MULTIPLE_CHOICE)',
      example: [
        { label: 'A', value: 'Nguyễn Du', isCorrect: true },
        { label: 'B', value: 'Nguyễn Trãi' },
        { label: 'C', value: 'Hồ Xuân Hương' },
      ],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuizOptionDto)
    options?: QuizOptionDto[];
  
    @ApiPropertyOptional({
      description: 'Đáp án đúng, có thể là chuỗi hoặc mảng (tùy loại câu hỏi)',
      example: 'Nguyễn Du',
    })
    @IsOptional()
    answerKey?: string | string[];
  }
  