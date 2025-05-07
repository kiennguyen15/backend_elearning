import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import {
  Course_Exams,
  Course_ExamsDocument,
} from "src/course_Exams/schema/course_Exams.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GetCourseExamsByCondition } from "./dto/condition.dto";
import { UserRole } from "src/users/enum/role.enum";
import { StringUtils } from "src/common/utils/string.utils";

@Injectable()
export class Course_ExamsRepo {
  private readonly _course_ExamsModel: Model<Course_ExamsDocument>;
  constructor(
    @InjectModel(Course_Exams.name)
    course_ExamsModel: Model<Course_ExamsDocument>
  ) {
    this._course_ExamsModel = course_ExamsModel;
  }

  async createCourse_Exams(
    data: any,
    session?: ClientSession
  ): Promise<Course_ExamsDocument> {
    const [Course_Exams] = await this._course_ExamsModel.create([data], {
      session,
    });
    return Course_Exams;
  }

  async createManyCourse_Exams(
    data: any,
    session?: ClientSession
  ): Promise<any> {
    return await this._course_ExamsModel.insertMany(data, { session });
  }

  async findCourse_ExamsById(
    id: any,
    session?: ClientSession
  ): Promise<Course_ExamsDocument | null> {
    return await this._course_ExamsModel.findById(id).session(session || null);
  }

  async findOneCourse_ExamsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<Course_ExamsDocument | null> {
    return await this._course_ExamsModel
      .findOne(condition)
      .session(session || null);
  }

  async findCourse_ExamsByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._course_ExamsModel
      .find(condition)
      .session(session || null);
  }

  async updateCourse_Exams(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<Course_ExamsDocument | null> {
    return await this._course_ExamsModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateCourse_ExamsByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<Course_ExamsDocument | null> {
    return await this._course_ExamsModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteCourse_Exams(id: any, session?: ClientSession) {
    return await this._course_ExamsModel.findByIdAndDelete(id, { session });
  }

  async deleteOneCourse_ExamsByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._course_ExamsModel.deleteOne(condition, { session });
  }

  async deleteManyCourse_ExamsByCondition(
    condition: any,
    session?: ClientSession
  ) {
    return await this._course_ExamsModel.deleteMany(condition, { session });
  }

  async getAllCourseExams(
    condition: GetCourseExamsByCondition,
    typeUser?: UserRole,
    uid?: string
  ) {
    const query: any = {};
    if (condition.query) {
      const regex = new RegExp(condition.query, "i");
      query.$or = [{ title: { $regex: regex } }];
    }

    if (condition.type) {
      query.type = condition.type;
    }

    if (condition.time_from && condition.time_to) {
      query["availableFrom"] = {
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
          from: "user_courses",
          localField: "cid",
          foreignField: "cid",
          as: "InfoUserCourse",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "cid",
          foreignField: "_id",
          as: "InfoCourses",
        },
      },
    ];

    if (typeUser === UserRole.STUDENT && uid) {
      pipeline.push({
        $match: {
          "InfoUserCourse.uid": uid,
        },
      });
    }

    if (typeUser === UserRole.INSTRUCTOR && uid) {
      pipeline.push({
        $match: {
          "InfoCourses.respId": uid,
        },
      });
    }

    const totalPipeline = [...pipeline];
    totalPipeline.push({ $count: "total" });
    const totalResult = await this._course_ExamsModel
      .aggregate(totalPipeline)
      .exec();
    const total = totalResult[0]?.total || 0;

    const limit = condition.limit || 10;
    const skip = (condition.page - 1) * limit || 0;

    const data = await this._course_ExamsModel
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

  async checkUserInCourse(uid, ceid){
    return await this._course_ExamsModel.aggregate([
      {
        $match: {
          _id: StringUtils.ObjectId(ceid)
        }
      },
      {
        $lookup: {
          from: 'user_courses',
          localField: 'cid',
          foreignField: 'cid',
          as: 'InfoUserCourse'
        }
      },
      {
        $match: {
          'InfoUserCourse.uid': StringUtils.ObjectId(uid)
        }
      }
    ])
  }
}
