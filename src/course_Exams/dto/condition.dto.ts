import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/common/paging/paging.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TypeExam } from "../enum/type.enum";

export class GetCourseExamsByCondition extends PaginationDto {
  @ApiProperty({
    description: "Loại kỳ thi",
    type: String,
    enum: TypeExam,
    required: false,
  })
  @IsOptional()
  @IsEnum(TypeExam, { message: "ohh type exams" })
  @IsString()
  type: string;
}
