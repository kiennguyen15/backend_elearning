import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({type: Boolean})
  @IsBoolean()
  hasQuiz: boolean;
}
