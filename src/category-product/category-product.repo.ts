import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, ClientSession } from 'mongoose';
import { CategoryProduct, CategoryProductDocument } from './schema/category-product.schema';

@Injectable()
export class CategoryProductRepo {
  constructor(
    @InjectModel(CategoryProduct.name)
    private readonly _categoryProductModel: Model<CategoryProductDocument>,
  ) {}

  async findOne(filter: FilterQuery<CategoryProduct>, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findOne(filter).session(session || null);
  }

  async find(filter, session?: ClientSession): Promise<CategoryProductDocument[]> {
    return await this._categoryProductModel.find(filter).session(session || null);
  }

  async findById(id: string, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findById(id).session(session || null);
  }

  async update(id: string, data: Partial<CategoryProduct>, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findByIdAndUpdate(id, data, { new: true }).session(session || null);
  }

  async delete(id: string, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findByIdAndDelete(id).session(session || null);
  }

  async create(data: Partial<CategoryProduct>, session?: ClientSession): Promise<CategoryProductDocument> {
    const [category] = await this._categoryProductModel.create([data], { session });
    return category;
  }

  async createMany(data: Partial<CategoryProduct>[], session?: ClientSession): Promise<CategoryProductDocument[]> {
    return await this._categoryProductModel.insertMany(data, { session });
  }

  async findByCondition(condition: FilterQuery<CategoryProduct>, session?: ClientSession): Promise<CategoryProductDocument[]> {
    return await this._categoryProductModel.find(condition).session(session || null);
  }

  async findByCode(code: string, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findOne({ code }).session(session || null);
  }

  async findBySlug(slug: string, session?: ClientSession): Promise<CategoryProductDocument | null> {
    return await this._categoryProductModel.findOne({ slug }).session(session || null);
  }


}
