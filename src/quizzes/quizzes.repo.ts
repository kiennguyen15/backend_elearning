import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import { Quizzes, QuizzesDocument } from "src/quizzes/schema/quizzes.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GetQuizzesByCondition } from "./dto/condition.dto";
import { StringUtils } from "src/common/utils/string.utils";

@Injectable()
export class QuizzesRepo {
  private readonly _quizzesModel: Model<QuizzesDocument>;
  constructor(@InjectModel(Quizzes.name) quizzesModel: Model<QuizzesDocument>) {
    this._quizzesModel = quizzesModel;
  }

  async createQuizzes(
    data: any,
    session?: ClientSession
  ): Promise<QuizzesDocument> {
    const [Quizzes] = await this._quizzesModel.create([data], { session });
    return Quizzes;
  }

  async createManyQuizzes(data: any, session?: ClientSession): Promise<any> {
    return await this._quizzesModel.insertMany(data, { session });
  }

  async findQuizzesById(
    id: any,
    session?: ClientSession
  ): Promise<QuizzesDocument | null> {
    return await this._quizzesModel.findById(id).session(session || null);
  }

  async findOneQuizzesByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<QuizzesDocument | null> {
    return await this._quizzesModel.findOne(condition).session(session || null);
  }

  async findQuizzesByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._quizzesModel.find(condition).session(session || null);
  }

  async updateQuizzes(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<QuizzesDocument | null> {
    return await this._quizzesModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateQuizzesByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<QuizzesDocument | null> {
    return await this._quizzesModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteQuizzes(id: any, session?: ClientSession) {
    return await this._quizzesModel.findByIdAndDelete(id, { session });
  }

  async deleteOneQuizzesByCondition(condition: any, session?: ClientSession) {
    return await this._quizzesModel.deleteOne(condition, { session });
  }

  async deleteManyQuizzesByCondition(condition: any, session?: ClientSession) {
    return await this._quizzesModel.deleteMany(condition, { session });
  }

  async getByCondition(condition: GetQuizzesByCondition) {
    const query: any = {};
    if (condition.query) {
      const regex = new RegExp(condition.query, "i");
      query.$or = [{ questionText: { $regex: regex } }];
    }

    if (condition.time_from && condition.time_to) {
      query["createdAt"] = {
        $gte: new Date(condition.time_from),
        $lte: new Date(condition.time_to),
      };
    }

    const limit = condition.limit || 10;
    const skip = (condition.page - 1) * limit || 0;

    const sort: any = {};
    if (condition.orderBy) {
      const [field, order] = condition.orderBy.split(":");
      sort[field] = order === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    if (condition.lid) {
      query.lid = StringUtils.ObjectId(condition.lid);
    }

    const total = await this._quizzesModel.countDocuments(query);

    const data = await this._quizzesModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    return {
      data,
      total,
      condition: condition.page,
      limit,
    };
  }
}
