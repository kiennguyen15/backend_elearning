import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Điện thoại',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Đường dẫn thân thiện',
    example: 'dien-thoai',
    required: false,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Mã danh mục',
    example: 'PHONE',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Thứ tự ưu tiên',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  priority?: number;

  @ApiProperty({
    description: 'Trạng thái hoạt động',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // @ApiProperty({
  //   description: 'Ảnh danh mục',
  //   type: 'string',
  //   format: 'binary',
  //   required: false,
  // })
  // image?: any;
}
