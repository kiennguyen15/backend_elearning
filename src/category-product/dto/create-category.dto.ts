import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Điện thoại',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Đường dẫn thân thiện',
    example: 'dien-thoai',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'Mã danh mục',
    example: 'PHONE',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Thứ tự ưu tiên',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @ApiProperty({
    description: 'Trạng thái hoạt động',
    example: true,
    default: true,
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
