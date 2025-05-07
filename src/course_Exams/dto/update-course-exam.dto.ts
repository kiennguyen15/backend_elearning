import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TypeExam } from "../enum/type.enum";

export class UpdateCourseExamDto {
  @ApiPropertyOptional({
    example: "605c72ef153207001f5e4f6",
    description: "ID của khóa học (Course) mà kỳ thi này thuộc về",
  })
  @IsMongoId()
  @IsOptional()
  cid?: string;

  @ApiPropertyOptional({
    example: "Kỳ thi giữa kỳ môn Lập trình Web",
    description: "Tiêu đề kỳ thi",
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 30,
    description: "Tỉ lệ đậu",
  })
  @IsNumber()
  @IsOptional()
  percentAnswer: number;

  @ApiProperty({
    example: true,
    description: "Chấm bài theo",
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  direct?: boolean;

  @ApiPropertyOptional({
    example: TypeExam.CERTIFICATION_EXAM,
    description: "Loại kỳ thi, có thể là chứng chỉ, cuối kỳ...",
    enum: TypeExam,
  })
  @IsEnum(TypeExam)
  @IsOptional()
  type?: TypeExam;

  @ApiPropertyOptional({
    example: "2025-05-01T00:00:00Z",
    description: "Thời gian kỳ thi sẽ bắt đầu có sẵn (ISO 8601 format)",
  })
  @IsDateString()
  @IsOptional()
  availableFrom?: string; // Thời gian bắt đầu

  @ApiPropertyOptional({
    example: "2025-05-10T23:59:59Z",
    description: "Thời gian kỳ thi kết thúc, không còn sẵn (ISO 8601 format)",
  })
  @IsDateString()
  @IsOptional()
  availableTo?: string; // Thời gian kết thúc
}
