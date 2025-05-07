import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiPropertyOptional({
    description: 'Tên khóa học',
    example: 'Lập trình Web Fullstack',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'ID danh mục khóa học',
    example: '665e8c3f1d4e4e1e9c3b7e2a',
  })
  @IsString()
  @IsOptional()
  cateId?: string;

  @ApiPropertyOptional({
    description: 'Tiêu đề khóa học',
    example: 'Học lập trình từ A-Z',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Mô tả chi tiết khóa học',
    example: 'Khóa học giúp bạn làm chủ lập trình Web với Node.js và React',
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiPropertyOptional({
    description: 'Mục tiêu đạt được sau khóa học',
    example: 'Thành thạo lập trình Web, xây dựng được sản phẩm thực tế',
  })
  @IsString()
  @IsOptional()
  objectives?: string;

  @ApiPropertyOptional({
    description: 'Đường dẫn avatar của khóa học',
    example: 'https://example.com/images/course-avatar.png',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Đường dẫn banner của khóa học',
    example: 'https://example.com/images/course-banner.png',
  })
  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @ApiPropertyOptional({
    description: 'Mục đích tổng quan của khóa học',
    example: 'Trang bị kiến thức nền tảng và thực chiến trong lập trình',
  })
  @IsString()
  @IsOptional()
  purpose?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động của khóa học',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
