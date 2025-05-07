import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CategoryProductRepo } from './category-product.repo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MediaService } from '../media/media.service';
import * as mongoose from 'mongoose';
import { MessageCode } from '../common/exception/MessageCode';
import { StringUtils } from '../common/utils/string.utils';
import { FILE_UPLOAD_CATEGORY } from '../common/constants/media.constants';
import { TypeImage } from '../media/enum/type.enum';

@Injectable()
export class CategoryProductService {
  constructor(
    private readonly _categoryProductRepo: CategoryProductRepo,
    private readonly _mediaService: MediaService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async findById(id: string) {
    const category = await this._categoryProductRepo.findById(id);
    if (!category) {
      throw MessageCode.CATEGORY_PRODUCT.NOT_FOUND;
    }
    return category;
  }

  async findByCondition(condition) {
    return await this._categoryProductRepo.find(condition);
  }

  async create(createDto: CreateCategoryDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const data = {
        _id: StringUtils.generateObjectId(),
        ...createDto,
      };
      const category = await this._categoryProductRepo.create(data, session);
      await session.commitTransaction();
      return category;
    } catch (error) {
      await session.abortTransaction();
      throw MessageCode.CUSTOM.dynamicError(error.code, error.message || error.errorResponse?.errmsg);
    } finally {
      session.endSession();
    }
  }

  async update(id: string, updateDto: UpdateCategoryDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const category = await this._categoryProductRepo.findById(id, session);
      if (!category) {
        throw MessageCode.CATEGORY_PRODUCT.NOT_FOUND;
      }

      const updatedCategory = await this._categoryProductRepo.update(id, updateDto, session);
      await session.commitTransaction();
      return updatedCategory;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async uploadImage(id: string, file) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const category = await this._categoryProductRepo.findById(id, session);
      if (!category) {
        throw MessageCode.CATEGORY_PRODUCT.NOT_FOUND;
      }
      if (file) {
        const imageLink = `${FILE_UPLOAD_CATEGORY}/${id}.png`;
        await this._mediaService.uploadImage(
          file,
          TypeImage.CATEGORY,
          id,
          FILE_UPLOAD_CATEGORY,
          undefined,
          id,
          session,
        );
        const updatedCategory = await this._categoryProductRepo.update(id, { image: imageLink }, session);
        await session.commitTransaction();
        return updatedCategory;
      }
      throw MessageCode.CUSTOM.dynamicError('INVALID_FILE', 'Image file is required');
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async delete(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const category = await this._categoryProductRepo.findById(id, session);
      if (!category) {
        throw MessageCode.CATEGORY_PRODUCT.NOT_FOUND;
      }

      await this._categoryProductRepo.delete(id, session);
      await this._mediaService.deleteMultiCondition(id, session);
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findByCode(code: string) {
    const category = await this._categoryProductRepo.findByCode(code);
    if (!category) {
      throw MessageCode.CATEGORY_PRODUCT.NOT_FOUND;
    }
    return category;
  }

  async findBySlug(slug: string) {
    const category = await this._categoryProductRepo.findBySlug(slug);
    if (!category) {
      throw MessageCode.CATEGORY.NOT_FOUND;
    }
    return category;
  }
}
