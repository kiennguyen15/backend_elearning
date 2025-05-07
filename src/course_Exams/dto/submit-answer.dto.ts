import { IsArray, IsMongoId, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SubmitAnswerDto {
  @ApiProperty({ example: '6819c93469e63f2d19bd45ca', description: 'ID câu hỏi' })
  @IsMongoId()
  _id: string;

  @ApiProperty({ example: 'A', description: 'Đáp án của người dùng' })
  @IsString()
  answer: string;
}

export class SubmitExamDto {
  @ApiProperty({ example: '6819ce5480cfbd585d32b9f4', description: 'ID bài thi' })
  @IsMongoId()
  ceid: string;

  @ApiProperty({
    type: [SubmitAnswerDto],
    description: 'Danh sách các câu hỏi và đáp án đã được người dùng chọn',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  questions: SubmitAnswerDto[];
}
