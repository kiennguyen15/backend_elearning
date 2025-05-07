import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class UpdateExamsQuestionDto {
  @ApiPropertyOptional({
    example: "665f1a7e4b1c9d001f3b1234",
    description: "ID mới của kỳ thi (Course_Exams)",
  })
  @IsOptional()
  @IsMongoId()
  ceid?: string;

  @ApiPropertyOptional({
    example: "665c3a1e1a4f2c001e6d12b3",
    description: "ID mới của câu hỏi (Quiz)",
  })
  @IsOptional()
  @IsMongoId()
  qid?: string;
}
