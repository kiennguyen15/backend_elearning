import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Course_ExamsService } from './course_Exams.service';
import { Control } from "src/common/meta/control.meta";
import { Description } from 'src/common/meta/description.meta';
import { CreateCourseExamDto } from './dto/create-course-exam.dto';
import { UpdateCourseExamDto } from './dto/update-course-exam.dto';
import { GetCourseExamsByCondition } from './dto/condition.dto';
import { UserQuery } from 'src/auth/model/userQuery.model';
import { User } from 'src/common/meta/user.meta';
import { SubmitExamDto } from './dto/submit-answer.dto';
import { CreateExamResultDto } from 'src/exam_Results/dto/create.dto';

@Control('course_Exams')
export class Course_ExamsController {
    constructor(private readonly _courseExamsService: Course_ExamsService, ){}

    // Tạo mới kỳ thi
  @Post("create")
  @Description("Tạo mới kỳ thi cho khóa học", [{ status: 200, description: "Create successfully" }])
  async createCourseExam(@Body() body: CreateCourseExamDto) {
    return await this._courseExamsService.createCourseExam(body);
  }

  // Cập nhật kỳ thi
  @Put("update")
  @Description("Cập nhật kỳ thi", [{ status: 200, description: "Update successfully" }])
  async updateCourseExam(@Query("id") id: string, @Body() body: UpdateCourseExamDto) {
    return await this._courseExamsService.updateCourseExam(id, body);
  }

  // Xóa kỳ thi
  @Delete("delete")
  @Description("Xóa kỳ thi", [{ status: 200, description: "Delete successfully" }])
  async deleteCourseExam(@Query("id") id: string) {
    return await this._courseExamsService.deleteCourseExam(id);
  }

  // Lấy danh sách kỳ thi theo khóa học (cid)
  @Get("getByCid")
  @Description("Lấy danh sách kỳ thi theo khóa học (cid)", [{ status: 200, description: "Get successfully" }])
  async getByCourse(@Query("cid") cid: string) {
    return await this._courseExamsService.getExamsByCourse(cid);
  }
  
  @Get("getAllExamCourse")
  @Description("Lấy danh sách kỳ thi", [{ status: 200, description: "Get successfully" }])
  async getAllExamCourse(@User() user: UserQuery, @Query() condition: GetCourseExamsByCondition) {
    return await this._courseExamsService.getAllCourseExams(user.phone, condition);
  }

  @Post("start-exam")
  @Description("Bắt đầu thi", [{ status: 200, description: "Start exams successfully" }])
  async startExam(@User() user: UserQuery, @Body() query: CreateExamResultDto) {
    return await this._courseExamsService.startExam(user.uid, query);
  }

  @Put("submit")
  @Description("Nộp bài thi", [{ status: 200, description: "submit exams successfully" }])
  async submitCourseExams(@User() user: UserQuery, @Body() anser: SubmitExamDto) {
    return await this._courseExamsService.submitCourseExams(user.uid, anser);
  }
}

