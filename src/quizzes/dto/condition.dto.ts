import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/common/paging/paging.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetQuizzesByCondition extends PaginationDto {
  @ApiProperty({
    description: "ID của bài học cần lấy (tùy chọn)",
    required: false,
  })
  @IsOptional()
  @IsString()
  lid?: string;
}
