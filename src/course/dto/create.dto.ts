import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Tên khóa học',
    example: 'Lập trình Web Fullstack',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID danh mục khóa học',
    example: '665e8c3f1d4e4e1e9c3b7e2a',
  })
  @IsString()
  @IsNotEmpty()
  cateId: string;

  @ApiProperty({
    description: 'Tiêu đề khóa học',
    example: 'Học lập trình từ A-Z',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết khóa học',
    example: 'Khóa học giúp bạn làm chủ lập trình Web với Node.js và React',
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    description: 'Mục tiêu đạt được sau khóa học',
    example: 'Thành thạo lập trình Web, xây dựng được sản phẩm thực tế',
  })
  @IsString()
  @IsNotEmpty()
  objectives: string;

  @ApiProperty({
    description: 'Đường dẫn avatar của khóa học',
    example: 'https://example.com/images/course-avatar.png',
    required: false
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    description: 'Đường dẫn banner của khóa học',
    example: 'https://example.com/images/course-banner.png',
    required: false
  })
  @IsString()
  @IsOptional()
  bannerUrl: string;

  @ApiProperty({
    description: 'Mục đích tổng quan của khóa học',
    example: 'Trang bị kiến thức nền tảng và thực chiến trong lập trình',
  })
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của khóa học',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
