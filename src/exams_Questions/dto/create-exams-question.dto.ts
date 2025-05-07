import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateExamsQuestionDto {
  @ApiProperty({
    example: "665f1a7e4b1c9d001f3b1234",
    description: "ID của kỳ thi (Course_Exams)",
  })
  @IsMongoId()
  ceid: string;

  @ApiProperty({
    example: "665c3a1e1a4f2c001e6d12b3",
    description: "ID của câu hỏi (Quiz)",
  })
  @IsMongoId()
  qid: string;
}
