import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import { Lessons, LessonsDocument } from "src/lessons/schema/lessons.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LessonsRepo {
  private readonly _lessonsModel: Model<LessonsDocument>;
  constructor(@InjectModel(Lessons.name) lessonsModel: Model<LessonsDocument>) {
    this._lessonsModel = lessonsModel;
  }

  async createLessons(
    data: any,
    session?: ClientSession
  ): Promise<LessonsDocument> {
    const [Lessons] = await this._lessonsModel.create([data], { session });
    return Lessons;
  }

  async createManyLessons(data: any, session?: ClientSession): Promise<any> {
    return await this._lessonsModel.insertMany(data, { session });
  }

  async findLessonsById(
    id: any,
    session?: ClientSession
  ): Promise<LessonsDocument | null> {
    return await this._lessonsModel.findById(id).session(session || null);
  }

  async findOneLessonsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<LessonsDocument | null> {
    return await this._lessonsModel.findOne(condition).session(session || null);
  }

  async findLessonsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._lessonsModel.find(condition).session(session || null);
  }

  async updateLessons(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<LessonsDocument | null> {
    return await this._lessonsModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateLessonsByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<LessonsDocument | null> {
    return await this._lessonsModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteLessons(id: any, session?: ClientSession) {
    return await this._lessonsModel.findByIdAndDelete(id, { session });
  }

  async deleteOneLessonsByCondition(condition: any, session?: ClientSession) {
    return await this._lessonsModel.deleteOne(condition, { session });
  }

  async deleteManyLessonsByCondition(condition: any, session?: ClientSession) {
    return await this._lessonsModel.deleteMany(condition, { session });
  }

  async countLessonsByCourse(cid: string) {
    return await this._lessonsModel.countDocuments({ cid });
  }

  async getInfoLessons(cid) {
    return await this._lessonsModel.find({ cid }).sort({ index: 1 });
  }
  
}
