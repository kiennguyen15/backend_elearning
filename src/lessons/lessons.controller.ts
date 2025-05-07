import { Body, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { Control } from "src/common/meta/control.meta";
import { Description } from "src/common/meta/description.meta";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Control("lessons")
export class LessonsController {
  constructor(private readonly _lessonsService: LessonsService) {}

  @Post("create")
  @Description("Tạo bài học mới", [ { status: 200, description: "Create successfully" },])
  async createLesson(@Body() body: CreateLessonDto) {
    return await this._lessonsService.createLesson(body);
  }

  @Put("update")
  @Description("Cập nhật bài học", [ { status: 200, description: "Update successfully" },])
  async updateLesson(@Query("id") id: string, @Body() body: UpdateLessonDto) {
    return await this._lessonsService.updateLesson(id, body);
  }

  @Delete("delete")
  @Description("Xóa bài học", [ { status: 200, description: "Delete successfully" },])
  async deleteLesson(@Query("id") id: string) {
    return await this._lessonsService.deleteLesson(id);
  }

  @Get("getByCid")
  @Description("Lấy danh sách bài học theo khóa học (cid)", [{ status: 200, description: "Get lessons successfully" }])
  async getByCourse(@Query("cid") cid: string) {
    return await this._lessonsService.getLessonsByCourse(cid);
  }
}
