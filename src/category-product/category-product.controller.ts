import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles } from '@nestjs/common';
import 'multer';
import { UploadMedia } from 'src/common/meta/upload-media.meta';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Control } from 'src/common/meta/control.meta';
import { Description } from 'src/common/meta/description.meta';
import { Roles } from 'src/common/meta/role.meta';
import { UserRole } from '../users/enum/role.enum';
import { ParamHeader } from 'src/common/meta/param-head.decorator';

@Control('category-product')
// @ApiTags('Danh mục sản phẩm')
export class CategoryProductController {
  constructor(private readonly _categoryProductService: CategoryProductService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @Description('Create a new category', [{ status: 200, description: 'Create successfully' }])
  @ApiOperation({ summary: 'Tạo mới danh mục' })
  @ApiResponse({ status: 201, description: 'Tạo danh mục thành công' })
  @ApiBody({ type: CreateCategoryDto })
  async create(@Body() createDto: CreateCategoryDto) {
    return await this._categoryProductService.create(createDto);
  }

  @Get('AllCategories')
  @Description('Get all categories', [{ status: 200, description: 'Get successfully' }])
  async getAllCategories() {
    return await this._categoryProductService.findByCondition({ isActive: true });
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @Description('Update category', [{ status: 200, description: 'Update successfully' }])
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiResponse({ status: 200, description: 'Cập nhật danh mục thành công' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    return await this._categoryProductService.update(id, updateDto);
  }

  @Post(':id/upload-image')
  @Roles(UserRole.ADMIN)
  @Description('Upload category image', [{ status: 200, description: 'Upload successfully' }])
  @ApiOperation({ summary: 'Upload ảnh danh mục' })
  @ApiResponse({ status: 200, description: 'Upload ảnh thành công' })
  @UploadMedia('image')
  async uploadImage(@Param('id') id: string, @UploadedFile() file) {
    return await this._categoryProductService.uploadImage(id, file);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @Description('Delete category', [{ status: 200, description: 'Delete successfully' }])
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiResponse({ status: 200, description: 'Xóa danh mục thành công' })
  async delete(@Param('id') id: string) {
    return await this._categoryProductService.delete(id);
  }

  @Get('code/:code')
  @Description('Get category by code', [{ status: 200, description: 'Get successfully' }])
  @ApiOperation({ summary: 'Lấy danh mục theo mã' })
  @ApiResponse({ status: 200, description: 'Lấy danh mục thành công' })
  async findByCode(@Param('code') code: string) {
    return await this._categoryProductService.findByCode(code);
  }

  @Get('slug/:slug')
  @Description('Get category by slug', [{ status: 200, description: 'Get successfully' }])
  @ApiOperation({ summary: 'Lấy danh mục theo slug' })
  @ApiResponse({ status: 200, description: 'Lấy danh mục thành công' })
  async findBySlug(@Param('slug') slug: string) {
    return await this._categoryProductService.findBySlug(slug);
  }

}
