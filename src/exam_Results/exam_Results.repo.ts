import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import {
  Exam_Results,
  Exam_ResultsDocument,
} from "src/exam_Results/schema/exam_Results.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GetResultsByCondition } from "./dto/condition.dto";
import { UserRole } from "src/users/enum/role.enum";

@Injectable()
export class Exam_ResultsRepo {
  private readonly _exam_ResultsModel: Model<Exam_ResultsDocument>;
  constructor(
    @InjectModel(Exam_Results.name)
    exam_ResultsModel: Model<Exam_ResultsDocument>
  ) {
    this._exam_ResultsModel = exam_ResultsModel;
  }

  async createExam_Results(
    data: any,
    session?: ClientSession
  ): Promise<Exam_ResultsDocument> {
    const [Exam_Results] = await this._exam_ResultsModel.create([data], {
      session,
    });
    return Exam_Results;
  }

  async createManyExam_Results(
    data: any,
    session?: ClientSession
  ): Promise<any> {
    return await this._exam_ResultsModel.insertMany(data, { session });
  }

  async findExam_ResultsById(
    id: any,
    session?: ClientSession
  ): Promise<Exam_ResultsDocument | null> {
    return await this._exam_ResultsModel.findById(id).session(session || null);
  }

  async findOneExam_ResultsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<Exam_ResultsDocument | null> {
    return await this._exam_ResultsModel
      .findOne(condition)
      .session(session || null);
  }

  async findExam_ResultsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._exam_ResultsModel
      .find(condition)
      .session(session || null);
  }

  async updateExam_Results(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<Exam_ResultsDocument | null> {
    return await this._exam_ResultsModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateExam_ResultsByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<Exam_ResultsDocument | null> {
    return await this._exam_ResultsModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteExam_Results(id: any, session?: ClientSession) {
    return await this._exam_ResultsModel.findByIdAndDelete(id, { session });
  }

  async deleteOneExam_ResultsByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._exam_ResultsModel.deleteOne(condition, { session });
  }

  async deleteManyExam_ResultsByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._exam_ResultsModel.deleteMany(condition, { session });
  }

  async getExamResults(
    condition: GetResultsByCondition,
    typeUser?: UserRole,
    uid?: string
  ) {
    const query: any = {};
    if (condition.query) {
      const regex = new RegExp(condition.query, "i");
      query.$or = [{ title: { $regex: regex } }];
    }

    if (condition.time_from && condition.time_to) {
      query["createdAt"] = {
        $gte: new Date(condition.time_from),
        $lte: new Date(condition.time_to),
      };
    }

    const sort: any = {};
    if (condition.orderBy) {
      const [field, order] = condition.orderBy.split(":");
      sort[field] = order === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const pipeline: any[] = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "_id",
          as: "InfoUserExam",
        },
      },
      {
        $lookup: {
          from: "course_exams",
          localField: "ceid",
          foreignField: "_id",
          as: "InfoCoursesExam",
        },
      },
      {
        $unwind: "$InfoCoursesExam",
      },
      {
        $lookup: {
          from: "courses",
          localField: "InfoCoursesExam.cid",
          foreignField: "_id",
          as: "InfoCourse",
        },
      },
      {
        $unwind: "$InfoCourse",
      },
    ];

    if (typeUser === UserRole.STUDENT && uid) {
      pipeline.push({
        $match: {
          uid: uid,
        },
      });
    }

    if (typeUser === UserRole.INSTRUCTOR && uid) {
      pipeline.push({
        $match: {
          "InfoCourse.respId": uid,
        },
      });
    }

    const totalPipeline = [...pipeline];
    totalPipeline.push({ $count: "total" });
    const totalResult = await this._exam_ResultsModel
      .aggregate(totalPipeline)
      .exec();
    const total = totalResult[0]?.total || 0;

    const limit = condition.limit || 10;
    const skip = (condition.page - 1) * limit || 0;

    const data = await this._exam_ResultsModel
      .aggregate(pipeline)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    return {
      data,
      total,
      page: condition.page,
      limit,
    };
  }
}
