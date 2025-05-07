import { Body, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import { Control } from "src/common/meta/control.meta";
import { Description } from "src/common/meta/description.meta";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";
import { Roles } from "src/common/meta/role.meta";
import { UserRole } from "src/users/enum/role.enum";
import { GetQuizzesByCondition } from "./dto/condition.dto";

@Control("quizzes")
export class QuizzesController {
  constructor(private readonly _quizzesService: QuizzesService) {}

  @Post("create")
  @Description("Tạo câu hỏi mới", [
    { status: 200, description: "Create successfully" },
  ])
  async createQuiz(@Body() body: CreateQuizDto) {
    return await this._quizzesService.createQuiz(body);
  }

  @Put("update")
  @Description("Cập nhật câu hỏi", [
    { status: 200, description: "Update successfully" },
  ])
  async updateQuiz(@Query('id') id: string, @Body() body: UpdateQuizDto) {
    return await this._quizzesService.updateQuiz(id, body);
  }

  @Delete("delete")
  @Description("Xóa câu hỏi", [
    { status: 200, description: "Delete successfully" },
  ])
  async deleteQuiz(@Query("id") id: string) {
    return await this._quizzesService.deleteQuiz(id);
  }

  @Get("getByLesson")
  @Description("Lấy danh sách câu hỏi theo bài học (lid)", [
    { status: 200, description: "Get quizzes successfully" },
  ])
  async getByLesson(@Query("lid") lid: string) {
    return await this._quizzesService.getQuizzesByLesson(lid);
  }

  @Get("getByCondition")
  // @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Description("Lấy danh sách câu hỏi theo condition", [
    { status: 200, description: "Get quizzes successfully" },
  ])
  async getByCondition(@Query() condition: GetQuizzesByCondition) {
    return await this._quizzesService.getByCondition(condition);
  }
}
