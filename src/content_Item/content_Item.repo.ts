import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import {
  Content_Item,
  Content_ItemDocument,
} from "src/content_Item/schema/content_Item.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class Content_ItemRepo {
  private readonly _content_ItemModel: Model<Content_ItemDocument>;
  constructor(
    @InjectModel(Content_Item.name)
    content_ItemModel: Model<Content_ItemDocument>
  ) {
    this._content_ItemModel = content_ItemModel;
  }

  async createContent_Item(
    data: any,
    session?: ClientSession
  ): Promise<Content_ItemDocument> {
    const [Content_Item] = await this._content_ItemModel.create([data], {
      session,
    });
    return Content_Item;
  }

  async createManyContent_Item(
    data: any,
    session?: ClientSession
  ): Promise<any> {
    return await this._content_ItemModel.insertMany(data, { session });
  }

  async findContent_ItemById(
    id: any,
    session?: ClientSession
  ): Promise<Content_ItemDocument | null> {
    return await this._content_ItemModel.findById(id).session(session || null);
  }

  async findOneContent_ItemByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<Content_ItemDocument | null> {
    return await this._content_ItemModel
      .findOne(condition)
      .session(session || null);
  }

  async findContent_ItemByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._content_ItemModel
      .find(condition)
      .session(session || null);
  }

  async updateContent_Item(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<Content_ItemDocument | null> {
    return await this._content_ItemModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateContent_ItemByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<Content_ItemDocument | null> {
    return await this._content_ItemModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteContent_Item(id: any, session?: ClientSession) {
    return await this._content_ItemModel.findByIdAndDelete(id, { session });
  }

  async deleteOneContent_ItemByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._content_ItemModel.deleteOne(condition, { session });
  }

  async deleteManyContent_ItemByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._content_ItemModel.deleteMany(condition, { session });
  }

  async countContentByLesson(lid: string) {
    return await this._content_ItemModel.countDocuments({ lid });
  }

  async findByLessonId(lid){
    return await this._content_ItemModel.find({ lid }).sort({ index: 1 });
  }
}
