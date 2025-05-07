import { Body, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { Exams_QuestionsService } from "./exams_Questions.service";
import { Control } from "src/common/meta/control.meta";
import { Description } from "src/common/meta/description.meta";
import { CreateExamsQuestionDto } from "./dto/create-exams-question.dto";
import { CreateManyExamsQuestionsDto } from "./dto/create-many-exams-questions.dto";
import { UpdateExamsQuestionDto } from "./dto/update-exams-question.dto";

@Control("exams_Questions")
export class Exams_QuestionsController {
  constructor(
    private readonly _examsQuestionsService: Exams_QuestionsService
  ) {}

  @Post("create")
  @Description("Thêm 1 câu hỏi vào kỳ thi", [
    { status: 200, description: "Create successfully" },
  ])
  async create(@Body() body: CreateExamsQuestionDto) {
    return await this._examsQuestionsService.create(body);
  }

  @Post("create-many")
  @Description("Thêm nhiều câu hỏi vào kỳ thi", [
    { status: 200, description: "Bulk insert successfully" },
  ])
  async createMany(@Body() body: CreateManyExamsQuestionsDto) {
    return await this._examsQuestionsService.createMany(body);
  }

  @Put("update")
  @Description("Cập nhật câu hỏi", [
    { status: 200, description: "Update successfully" },
  ])
  async update(@Query("id") id: string, @Body() body: UpdateExamsQuestionDto) {
    return await this._examsQuestionsService.update(id, body);
  }

  @Delete("delete")
  @Description("Xóa câu hỏi khỏi kỳ thi", [
    { status: 200, description: "Delete successfully" },
  ])
  async delete(@Query("id") id: string) {
    return await this._examsQuestionsService.delete(id);
  }

  @Get("get-by-exam")
  @Description("Lấy danh sách câu hỏi theo kỳ thi (ceid)", [
    { status: 200, description: "Fetched successfully" },
  ])
  async getByExam(@Query("ceid") ceid: string) {
    return await this._examsQuestionsService.getByExamByceId(ceid);
  }

}
