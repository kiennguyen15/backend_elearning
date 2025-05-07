import { Roles } from "src/common/meta/role.meta";
import { CourseService } from "./course.service";
import { Control } from "src/common/meta/control.meta";
import { UserRole } from "src/users/enum/role.enum";
import { Body, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { Description } from "src/common/meta/description.meta";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";
import { Public } from "src/common/meta/public.meta";
import { GetCourseByCondition } from "./dto/condition.dto";
import { User } from "src/common/meta/user.meta";
import { UserQuery } from "src/auth/model/userQuery.model";

@Control("course")
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Roles(UserRole.INSTRUCTOR)
  @Post("createCourse")
  @Description("Tạo khóa học mới", [
    { status: 200, description: "Course created successfully" },
  ])
  async createCourse(@User() user: UserQuery, @Body() dto: CreateCourseDto) {
    return await this._courseService.createCourse(user.uid, dto);
  }

  @Roles(UserRole.INSTRUCTOR)
  @Put("updateCourse")
  @Description("Cập nhật thông tin khóa học", [
    { status: 200, description: "Course updated successfully" },
  ])
  async updateCourse(@Query("id") id: string, @Body() dto: UpdateCourseDto) {
    return await this._courseService.updateCourse(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete("deleteCourse")
  @Description("Xóa khóa học theo ID", [
    { status: 200, description: "Course deleted successfully" },
  ])
  async deleteCourse(@Query("id") id: string) {
    return await this._courseService.deleteCourse(id);
  }

  @Public()
  @Get("getInfoCourseById")
  @Description("Lấy chi tiết khóa học theo ID", [
    { status: 200, description: "Get course successfully" },
  ])
  async getInfoCourseById(@Query("id") id: string) {
    return await this._courseService.getInfoCourseById(id);
  }

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.STUDENT)
  @Get("getCourses")
  @Description("Lọc danh sách khóa học", [
    { status: 200, description: "Get courses successfully" },
  ])
  async getCourses(@User() user: UserQuery, @Query() condition: GetCourseByCondition) {
    return await this._courseService.getCoursesByCondition(user.phone, condition);
  }
}
