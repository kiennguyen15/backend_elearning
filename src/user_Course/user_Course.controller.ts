import { Roles } from "src/common/meta/role.meta";
import { User_CourseService } from "./user_Course.service";
import { Control } from "src/common/meta/control.meta";
import { UserRole } from "src/users/enum/role.enum";
import { Body, Delete, Post, Put, Query } from "@nestjs/common";
import { Description } from "src/common/meta/description.meta";
import { CreateUserCourseDto } from "./dto/create.dto";
import { UpdateUserCourseDto } from "./dto/update.dto";

@Control("user_Course")
export class User_CourseController {
  constructor(private readonly _user_CourseService: User_CourseService) {}

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Post("addUsersToCourse")
  @Description("Thêm nhiều người dùng vào 1 khóa học", [
    { status: 200, description: "Add successfully" },
  ])
  async addUsersToCourse(@Body() dto: CreateUserCourseDto) {
    return await this._user_CourseService.addUserInCourse(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Put("updateUserInCourse")
  @Description("Cập nhật thông tin user-course", [
    { status: 200, description: "Update successfully" },
  ])
  async updateUserInCourse(
    @Query("id") id: string,
    @Body() dto: UpdateUserCourseDto
  ) {
    return await this._user_CourseService.updateUserInCourse(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Delete("deleteUserInCourse")
  @Description("Xóa user-course theo id", [
    { status: 200, description: "Delete successfully" },
  ])
  async deleteUserInCourse(@Query("id") id: string) {
    return await this._user_CourseService.deleteCourse(id);
  }
}
