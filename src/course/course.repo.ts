import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import { Course, CourseDocument } from "src/course/schema/course.schema";
import { InjectModel } from "@nestjs/mongoose";
import { GetCourseByCondition } from "./dto/condition.dto";

@Injectable()
export class CourseRepo {
  private readonly _courseModel: Model<CourseDocument>;
  constructor(@InjectModel(Course.name) courseModel: Model<CourseDocument>) {
    this._courseModel = courseModel;
  }

  async createCourse(
    data: any,
    session?: ClientSession
  ): Promise<CourseDocument> {
    const [Course] = await this._courseModel.create([data], { session });
    return Course;
  }

  async createManyCourse(data: any, session?: ClientSession): Promise<any> {
    return await this._courseModel.insertMany(data, { session });
  }

  async findCourseById(
    id: any,
    session?: ClientSession
  ): Promise<CourseDocument | null> {
    return await this._courseModel
      .findById(id)
      .populate("cateId")
      .populate("respId")
      .session(session || null);
  }

  async findOneCourseByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<CourseDocument | null> {
    return await this._courseModel.findOne(condition).session(session || null);
  }

  async findCourseByCondition(
    condition: any,
    session?: ClientSession
  ): Promise<any | null> {
    return await this._courseModel.find(condition).session(session || null);
  }

  async updateCourse(
    id: any,
    data: any,
    session?: ClientSession
  ): Promise<CourseDocument | null> {
    return await this._courseModel.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });
  }

  async updateCourseByCondition(
    condition: any,
    data: any,
    session?: ClientSession
  ): Promise<CourseDocument | null> {
    return await this._courseModel.findOneAndUpdate(condition, data, {
      new: true,
      session,
    });
  }

  async deleteCourse(id: any, session?: ClientSession) {
    return await this._courseModel.findByIdAndDelete(id, { session });
  }

  async deleteOneCourseByCondition(condition: any, session?: ClientSession) {
    return await this._courseModel.deleteOne(condition, { session });
  }

  async deleteManyCourseByCondition(condition: any, session?: ClientSession) {
    return await this._courseModel.deleteMany(condition, { session });
  }

  async getCoursesByCondition(condition: GetCourseByCondition, uid?: any) {
    const query: any = {};
    if (condition.query) {
      const regex = new RegExp(condition.query, "i");
      query.$or = [{ name: { $regex: regex } }, { title: { $regex: regex } }];
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

    const pipeline: any[] = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "categoryproducts",
          localField: "cateId",
          foreignField: "_id",
          as: "InfoCate",
        },
      },
      {
        $unwind: "$InfoCate",
      },
      {
        $lookup: {
          from: "users",
          localField: "respId",
          foreignField: "_id",
          as: "InfoResp",
        },
      },
      {
        $unwind: "$InfoResp",
      },
      {
        $lookup: {
          from: "user_courses",
          localField: "_id",
          foreignField: "cid",
          as: "InfoUserCourse",
        },
      },
    ];
    pipeline.push({ $sort: sort }, { $skip: skip }, { $limit: limit });

    if (uid) {
      pipeline.push({
        $match: {
          "InfoUserCourse.uid": uid,
        },
      });
    }

    const totalPipeline = [...pipeline];
    totalPipeline.push({ $count: "total" });
    const totalResult = await this._courseModel.aggregate(totalPipeline).exec();
    const total = totalResult[0]?.total || 0;

    const data = await this._courseModel
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
