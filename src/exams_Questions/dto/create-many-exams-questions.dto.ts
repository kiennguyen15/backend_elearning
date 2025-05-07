import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested, IsArray } from "class-validator";
import { CreateExamsQuestionDto } from "./create-exams-question.dto";

export class CreateManyExamsQuestionsDto {
  @ApiProperty({
    description: "Danh sách câu hỏi thuộc kỳ thi",
    type: [CreateExamsQuestionDto],
    example: [
      { ceid: "665f1a7e4b1c9d001f3b1234", qid: "665c3a1e1a4f2c001e6d12b3" },
      { ceid: "665f1a7e4b1c9d001f3b1234", qid: "665c3a1e1a4f2c001e6d12b4" },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamsQuestionDto)
  data: CreateExamsQuestionDto[];
}
