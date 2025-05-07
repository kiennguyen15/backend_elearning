import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/common/paging/paging.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";


export class GetResultsByCondition extends PaginationDto{}